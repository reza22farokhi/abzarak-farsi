const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = 'b876ede114df3f83cbb122c670cc6418';
const PROJECT_NAME = 'abzarak-farsi';

// فقط فایل‌ها و پوشه‌های ضروری سایت را می‌خواهیم
const ALLOWED_EXTENSIONS = ['.html', '.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.xml', '.txt'];

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        // نادیده گرفتن فایل‌ها و پوشه‌های مزاحم
        if (['.git', 'node_modules', 'tests', 'tools', 'docs', '.github'].includes(file)) continue;
        
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, fileList);
        } else {
            const ext = path.extname(name).toLowerCase();
            if (ALLOWED_EXTENSIONS.includes(ext) || file === 'CNAME' || file === 'manifest.json' || file === 'sw.js') {
                if (file !== 'deploy.js' && file !== 'package.json') {
                    fileList.push(name.replace(/\\/g, '/'));
                }
            }
        }
    }
    return fileList;
}

async function main() {
    if (!TOKEN || !TOKEN.startsWith('cfat_')) {
        console.error('Error: CLOUDFLARE_API_TOKEN is not set or invalid.');
        process.exit(1);
    }

    console.log('Searching for valid files...');
    const files = getFiles('.');
    console.log(`Found ${files.length} files to upload.`);
    
    if (files.length === 0) {
        console.error('Error: No valid files found!');
        return;
    }

    const manifest = {};
    const fileContents = {};

    console.log('Calculating file hashes...');
    for (const file of files) {
        try {
            const content = fs.readFileSync(file);
            const hash = crypto.createHash('sha256').update(content).digest('hex');
            const relPath = '/' + file.replace(/^\.\//, '');
            manifest[relPath] = hash;
            fileContents[hash] = content;
        } catch (e) {
            console.log(`Skipping file ${file}: ${e.message}`);
        }
    }

    console.log(`Creating deployment on Cloudflare...`);
    const formData = new FormData();
    formData.append('branch', 'main');
    formData.append('manifest', JSON.stringify(manifest));

    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${TOKEN}` },
        body: formData
    });

    const data = await res.json();
    if (!data.success) {
        console.error('Cloudflare API Error:', data.errors);
        return;
    }

    const deploymentId = data.result.id;
    const uploadUrls = data.result.upload_urls;
    const missingHashes = data.result.missing_hashes || [];

    if (missingHashes.length > 0) {
        console.log(`Uploading ${missingHashes.length} files...`);
        for (const hash of missingHashes) {
            const url = uploadUrls[hash];
            if (!url) continue;
            await fetch(url, { method: 'PUT', body: fileContents[hash], headers: { 'Content-Type': 'application/octet-stream' } });
        }
    }

    console.log('Finalizing deployment...');
    await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments/${deploymentId}/finalize`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${TOKEN}` }
    });

    console.log('\n✅ Site deployed successfully!');
    console.log(`🔗 URL: https://${PROJECT_NAME}.pages.dev`);
}

main().catch(err => console.error('Script Error:', err));
