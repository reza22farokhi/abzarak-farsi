const termuxCommands = [
  {
    "cat": "pkg",
    "cmd": "pkg update",
    "desc": "به‌روزرسانی لیست پکیج‌ها از مخازن"
  },
  {
    "cat": "pkg",
    "cmd": "pkg upgrade",
    "desc": "ارتقای تمام پکیج‌های نصب‌شده"
  },
  {
    "cat": "pkg",
    "cmd": "pkg update && pkg upgrade -y",
    "desc": "به‌روزرسانی کامل بدون نیاز به تایید"
  },
  {
    "cat": "pkg",
    "cmd": "pkg install [package]",
    "desc": "نصب یک پکیج جدید"
  },
  {
    "cat": "pkg",
    "cmd": "pkg install -y [package]",
    "desc": "نصب پکیج بدون پرسش تایید"
  },
  {
    "cat": "pkg",
    "cmd": "pkg uninstall [package]",
    "desc": "حذف یک پکیج"
  },
  {
    "cat": "pkg",
    "cmd": "pkg reinstall [package]",
    "desc": "نصب مجدد یک پکیج"
  },
  {
    "cat": "pkg",
    "cmd": "pkg list-installed",
    "desc": "نمایش تمام پکیج‌های نصب‌شده"
  },
  {
    "cat": "pkg",
    "cmd": "pkg list-all",
    "desc": "نمایش تمام پکیج‌های موجود در مخزن"
  },
  {
    "cat": "pkg",
    "cmd": "pkg search [name]",
    "desc": "جستجوی پکیج در مخزن"
  },
  {
    "cat": "pkg",
    "cmd": "pkg show [package]",
    "desc": "نمایش اطلاعات کامل یک پکیج"
  },
  {
    "cat": "pkg",
    "cmd": "pkg files [package]",
    "desc": "نمایش فایل‌های نصب‌شده یک پکیج"
  },
  {
    "cat": "pkg",
    "cmd": "pkg clean",
    "desc": "پاک کردن کش پکیج‌ها (آزادسازی فضا)"
  },
  {
    "cat": "pkg",
    "cmd": "pkg autoclean",
    "desc": "پاک کردن کش پکیج‌های قدیمی"
  },
  {
    "cat": "pkg",
    "cmd": "pkg help",
    "desc": "راهنمای دستور pkg"
  },
  {
    "cat": "pkg",
    "cmd": "apt update",
    "desc": "معادل pkg update با apt"
  },
  {
    "cat": "pkg",
    "cmd": "apt upgrade",
    "desc": "معادل pkg upgrade با apt"
  },
  {
    "cat": "pkg",
    "cmd": "apt install [package]",
    "desc": "نصب پکیج با apt"
  },
  {
    "cat": "pkg",
    "cmd": "apt remove [package]",
    "desc": "حذف پکیج با apt"
  },
  {
    "cat": "pkg",
    "cmd": "apt autoremove",
    "desc": "حذف پکیج‌های بدون استفاده"
  },
  {
    "cat": "pkg",
    "cmd": "apt list --installed",
    "desc": "لیست تمام پکیج‌های نصب‌شده"
  },
  {
    "cat": "pkg",
    "cmd": "apt search [name]",
    "desc": "جستجوی پکیج با apt"
  },
  {
    "cat": "pkg",
    "cmd": "apt-cache policy [package]",
    "desc": "نمایش نسخه‌های موجود پکیج"
  },
  {
    "cat": "pkg",
    "cmd": "dpkg -i [package.deb]",
    "desc": "نصب فایل پکیج .deb"
  },
  {
    "cat": "pkg",
    "cmd": "dpkg -l",
    "desc": "لیست پکیج‌های نصب‌شده از طریق dpkg"
  },
  {
    "cat": "pkg",
    "cmd": "termux-change-repo",
    "desc": "تغییر مخزن پکیج‌ها"
  },
  {
    "cat": "pkg",
    "cmd": "yes | pkg upgrade",
    "desc": "ارتقای خودکار با پاسخ بله به همه سوالات"
  },
  {
    "cat": "pkg",
    "cmd": "pkg install unstable-repo",
    "desc": "فعال‌سازی مخزن unstable"
  },
  {
    "cat": "pkg",
    "cmd": "pkg install x11-repo",
    "desc": "فعال‌سازی مخزن برنامه‌های گرافیکی"
  },
  {
    "cat": "pkg",
    "cmd": "pkg install root-repo",
    "desc": "فعال‌سازی مخزن root"
  },
  {
    "cat": "files",
    "cmd": "ls",
    "desc": "نمایش فایل‌ها و پوشه‌های پوشه فعلی"
  },
  {
    "cat": "files",
    "cmd": "ls -la",
    "desc": "نمایش تمام فایل‌ها (حتی مخفی) با جزئیات"
  },
  {
    "cat": "files",
    "cmd": "ls -lh",
    "desc": "نمایش فایل‌ها با حجم قابل خواندن"
  },
  {
    "cat": "files",
    "cmd": "ls -R",
    "desc": "نمایش بازگشتی محتویات همه زیرپوشه‌ها"
  },
  {
    "cat": "files",
    "cmd": "cd [dir]",
    "desc": "ورود به پوشه مشخص"
  },
  {
    "cat": "files",
    "cmd": "cd ..",
    "desc": "یک پوشه به عقب برگرد"
  },
  {
    "cat": "files",
    "cmd": "cd ~",
    "desc": "رفتن به پوشه خانگی"
  },
  {
    "cat": "files",
    "cmd": "cd -",
    "desc": "برگشت به پوشه قبلی"
  },
  {
    "cat": "files",
    "cmd": "pwd",
    "desc": "نمایش مسیر کامل پوشه فعلی"
  },
  {
    "cat": "files",
    "cmd": "mkdir [name]",
    "desc": "ساخت پوشه جدید"
  },
  {
    "cat": "files",
    "cmd": "mkdir -p path/to/dir",
    "desc": "ساخت پوشه‌های تودرتو"
  },
  {
    "cat": "files",
    "cmd": "rmdir [dir]",
    "desc": "حذف یک پوشه خالی"
  },
  {
    "cat": "files",
    "cmd": "rm [file]",
    "desc": "حذف فایل"
  },
  {
    "cat": "files",
    "cmd": "rm -f [file]",
    "desc": "حذف فایل بدون پرسش"
  },
  {
    "cat": "files",
    "cmd": "rm -rf [dir]",
    "desc": "حذف پوشه و تمام محتویات (احتیاط!)"
  },
  {
    "cat": "files",
    "cmd": "rm -i [file]",
    "desc": "حذف با تاییدیه"
  },
  {
    "cat": "files",
    "cmd": "cp [src] [dest]",
    "desc": "کپی فایل"
  },
  {
    "cat": "files",
    "cmd": "cp -r [src] [dest]",
    "desc": "کپی پوشه و محتویاتش"
  },
  {
    "cat": "files",
    "cmd": "cp -p [src] [dest]",
    "desc": "کپی با حفظ مجوز و زمان فایل"
  },
  {
    "cat": "files",
    "cmd": "mv [src] [dest]",
    "desc": "انتقال یا تغییر نام فایل/پوشه"
  },
  {
    "cat": "files",
    "cmd": "touch [file]",
    "desc": "ساخت فایل خالی یا به‌روزرسانی زمان"
  },
  {
    "cat": "files",
    "cmd": "cat [file]",
    "desc": "نمایش محتوای فایل"
  },
  {
    "cat": "files",
    "cmd": "cat file1 file2 > combined",
    "desc": "ادغام چند فایل در یک فایل"
  },
  {
    "cat": "files",
    "cmd": "less [file]",
    "desc": "نمایش فایل با اسکرول و جستجو"
  },
  {
    "cat": "files",
    "cmd": "more [file]",
    "desc": "نمایش فایل صفحه به صفحه"
  },
  {
    "cat": "files",
    "cmd": "head [file]",
    "desc": "نمایش ۱۰ خط اول فایل"
  },
  {
    "cat": "files",
    "cmd": "head -n 20 [file]",
    "desc": "نمایش ۲۰ خط اول فایل"
  },
  {
    "cat": "files",
    "cmd": "tail [file]",
    "desc": "نمایش ۱۰ خط آخر فایل"
  },
  {
    "cat": "files",
    "cmd": "tail -f [file]",
    "desc": "نمایش زنده تغییرات انتهای فایل (برای لاگ)"
  },
  {
    "cat": "files",
    "cmd": "wc -l [file]",
    "desc": "شمارش تعداد خطوط فایل"
  },
  {
    "cat": "files",
    "cmd": "chmod +x [file]",
    "desc": "قابل اجرا کردن فایل (مثلاً script.sh)"
  },
  {
    "cat": "files",
    "cmd": "chmod 755 [file]",
    "desc": "تنظیم مجوز rwxr-xr-x"
  },
  {
    "cat": "files",
    "cmd": "chmod 644 [file]",
    "desc": "تنظیم مجوز rw-r--r--"
  },
  {
    "cat": "files",
    "cmd": "chmod -R 755 [dir]",
    "desc": "تغییر مجوز بازگشتی پوشه"
  },
  {
    "cat": "files",
    "cmd": "chown [user] [file]",
    "desc": "تغییر مالکیت فایل"
  },
  {
    "cat": "files",
    "cmd": "chown -R [user]:[group] [dir]",
    "desc": "تغییر بازگشتی مالکیت"
  },
  {
    "cat": "files",
    "cmd": "find . -name \"*.txt\"",
    "desc": "پیدا کردن فایل با الگو"
  },
  {
    "cat": "files",
    "cmd": "find . -type f -name \"*.js\"",
    "desc": "پیدا کردن تمام فایل‌های js"
  },
  {
    "cat": "files",
    "cmd": "find . -size +10M",
    "desc": "پیدا کردن فایل‌های بزرگتر از ۱۰ مگابایت"
  },
  {
    "cat": "files",
    "cmd": "find . -mtime -7",
    "desc": "پیدا کردن فایل‌های تغییر یافته در ۷ روز اخیر"
  },
  {
    "cat": "files",
    "cmd": "du -sh [dir]",
    "desc": "نمایش حجم کل یک پوشه"
  },
  {
    "cat": "files",
    "cmd": "du -h --max-depth=1",
    "desc": "نمایش حجم پوشه‌های سطح اول"
  },
  {
    "cat": "files",
    "cmd": "df -h",
    "desc": "نمایش فضای خالی دیسک"
  },
  {
    "cat": "files",
    "cmd": "tree",
    "desc": "نمایش ساختار درختی پوشه‌ها"
  },
  {
    "cat": "files",
    "cmd": "stat [file]",
    "desc": "نمایش اطلاعات کامل یک فایل"
  },
  {
    "cat": "files",
    "cmd": "file [file]",
    "desc": "تشخیص نوع فایل"
  },
  {
    "cat": "files",
    "cmd": "ln -s [src] [link]",
    "desc": "ساخت symbolic link"
  },
  {
    "cat": "files",
    "cmd": "realpath [file]",
    "desc": "نمایش مسیر واقعی و کامل فایل"
  },
  {
    "cat": "files",
    "cmd": "basename [path]",
    "desc": "استخراج نام فایل از مسیر"
  },
  {
    "cat": "files",
    "cmd": "dirname [path]",
    "desc": "استخراج نام پوشه از مسیر"
  },
  {
    "cat": "files",
    "cmd": "readlink -f [link]",
    "desc": "خواندن مقصد یک symbolic link"
  },
  {
    "cat": "files",
    "cmd": "rsync -av [src] [dest]",
    "desc": "همگام‌سازی فایل/پوشه (نیاز به نصب)"
  },
  {
    "cat": "network",
    "cmd": "ping [host]",
    "desc": "تست اتصال به هاست"
  },
  {
    "cat": "network",
    "cmd": "ping -c 4 [host]",
    "desc": "پینگ ۴ بار"
  },
  {
    "cat": "network",
    "cmd": "ping -c 4 google.com",
    "desc": "تست اتصال به گوگل"
  },
  {
    "cat": "network",
    "cmd": "curl [url]",
    "desc": "دریافت محتوای یک URL"
  },
  {
    "cat": "network",
    "cmd": "curl -O [url]",
    "desc": "دانلود فایل از URL"
  },
  {
    "cat": "network",
    "cmd": "curl -o [file] [url]",
    "desc": "دانلود با نام مشخص"
  },
  {
    "cat": "network",
    "cmd": "curl -I [url]",
    "desc": "دریافت فقط headerهای HTTP"
  },
  {
    "cat": "network",
    "cmd": "curl -X POST [url]",
    "desc": "ارسال درخواست POST"
  },
  {
    "cat": "network",
    "cmd": "curl -X POST -d 'data' [url]",
    "desc": "ارسال POST با داده"
  },
  {
    "cat": "network",
    "cmd": "curl -H 'Header: value' [url]",
    "desc": "ارسال درخواست با header سفارشی"
  },
  {
    "cat": "network",
    "cmd": "curl -sSL [url] | bash",
    "desc": "دانلود و اجرای اسکریپت (احتیاط!)"
  },
  {
    "cat": "network",
    "cmd": "wget [url]",
    "desc": "دانلود فایل با wget"
  },
  {
    "cat": "network",
    "cmd": "wget -c [url]",
    "desc": "ادامه دانلود نیمه‌کاره"
  },
  {
    "cat": "network",
    "cmd": "wget -r -np [url]",
    "desc": "دانلود بازگشتی سایت"
  },
  {
    "cat": "network",
    "cmd": "wget -m [url]",
    "desc": "آینه کردن سایت"
  },
  {
    "cat": "network",
    "cmd": "ifconfig",
    "desc": "نمایش تنظیمات شبکه"
  },
  {
    "cat": "network",
    "cmd": "ip addr",
    "desc": "نمایش آدرس‌های IP"
  },
  {
    "cat": "network",
    "cmd": "ip route",
    "desc": "نمایش جدول مسیریابی"
  },
  {
    "cat": "network",
    "cmd": "netstat -tuln",
    "desc": "نمایش پورت‌های باز"
  },
  {
    "cat": "network",
    "cmd": "ss -tuln",
    "desc": "نمایش پورت‌های باز (جایگزین مدرن)"
  },
  {
    "cat": "network",
    "cmd": "ss -tlnp",
    "desc": "نمایش پورت‌های باز با پروسه"
  },
  {
    "cat": "network",
    "cmd": "ssh user@host",
    "desc": "اتصال به سرور SSH"
  },
  {
    "cat": "network",
    "cmd": "ssh -p 2222 user@host",
    "desc": "اتصال SSH روی پورت سفارشی"
  },
  {
    "cat": "network",
    "cmd": "ssh -i key.pem user@host",
    "desc": "اتصال SSH با کلید خصوصی"
  },
  {
    "cat": "network",
    "cmd": "scp [file] user@host:/path",
    "desc": "کپی فایل به سرور"
  },
  {
    "cat": "network",
    "cmd": "scp -r [dir] user@host:/path",
    "desc": "کپی پوشه به سرور"
  },
  {
    "cat": "network",
    "cmd": "scp user@host:/path [file]",
    "desc": "دانلود فایل از سرور"
  },
  {
    "cat": "network",
    "cmd": "ssh-keygen -t ed25519",
    "desc": "ساخت کلید SSH ed25519"
  },
  {
    "cat": "network",
    "cmd": "ssh-keygen -t rsa -b 4096",
    "desc": "ساخت کلید RSA 4096 بیتی"
  },
  {
    "cat": "network",
    "cmd": "ssh-copy-id user@host",
    "desc": "کپی کلید عمومی به سرور"
  },
  {
    "cat": "network",
    "cmd": "dig [domain]",
    "desc": "دریافت اطلاعات DNS دامنه"
  },
  {
    "cat": "network",
    "cmd": "dig +short [domain]",
    "desc": "دریافت فقط IP دامنه"
  },
  {
    "cat": "network",
    "cmd": "dig MX [domain]",
    "desc": "دریافت رکوردهای MX ایمیل"
  },
  {
    "cat": "network",
    "cmd": "nslookup [domain]",
    "desc": "بررسی رکوردهای DNS"
  },
  {
    "cat": "network",
    "cmd": "traceroute [host]",
    "desc": "ردیابی مسیر شبکه"
  },
  {
    "cat": "network",
    "cmd": "mtr [host]",
    "desc": "traceroute زنده (نیاز به نصب)"
  },
  {
    "cat": "network",
    "cmd": "nc -l -p 8080",
    "desc": "ایجاد سرور موقت روی پورت 8080"
  },
  {
    "cat": "network",
    "cmd": "nc -zv [host] [port]",
    "desc": "تست اتصال به پورت"
  },
  {
    "cat": "network",
    "cmd": "hostname -I",
    "desc": "نمایش IP خود در شبکه"
  },
  {
    "cat": "network",
    "cmd": "whois [domain]",
    "desc": "اطلاعات ثبت دامنه"
  },
  {
    "cat": "network",
    "cmd": "telnet [host] [port]",
    "desc": "اتصال به پورت TCP"
  },
  {
    "cat": "system",
    "cmd": "ps aux",
    "desc": "نمایش تمام پروسه‌های در حال اجرا"
  },
  {
    "cat": "system",
    "cmd": "ps -ef",
    "desc": "نمایش پروسه‌ها با فرمت استاندارد"
  },
  {
    "cat": "system",
    "cmd": "top",
    "desc": "نمایش زنده پروسه‌ها و منابع"
  },
  {
    "cat": "system",
    "cmd": "htop",
    "desc": "نسخه گرافیکی top"
  },
  {
    "cat": "system",
    "cmd": "kill [PID]",
    "desc": "کشتن پروسه با شناسه PID"
  },
  {
    "cat": "system",
    "cmd": "kill -9 [PID]",
    "desc": "کشتن اجباری پروسه"
  },
  {
    "cat": "system",
    "cmd": "killall [name]",
    "desc": "کشتن تمام پروسه‌های با نام مشخص"
  },
  {
    "cat": "system",
    "cmd": "pgrep [name]",
    "desc": "پیدا کردن PID یک پروسه"
  },
  {
    "cat": "system",
    "cmd": "pkill [name]",
    "desc": "کشتن پروسه با نام"
  },
  {
    "cat": "system",
    "cmd": "uname -a",
    "desc": "اطلاعات کامل سیستم"
  },
  {
    "cat": "system",
    "cmd": "uname -r",
    "desc": "نسخه کرنل لینوکس"
  },
  {
    "cat": "system",
    "cmd": "whoami",
    "desc": "نام کاربر فعلی"
  },
  {
    "cat": "system",
    "cmd": "id",
    "desc": "اطلاعات UID, GID و گروه‌ها"
  },
  {
    "cat": "system",
    "cmd": "date",
    "desc": "تاریخ و ساعت فعلی"
  },
  {
    "cat": "system",
    "cmd": "date +%s",
    "desc": "تاریخ به صورت timestamp یونیکس"
  },
  {
    "cat": "system",
    "cmd": "uptime",
    "desc": "مدت زمان روشن بودن"
  },
  {
    "cat": "system",
    "cmd": "free -h",
    "desc": "حجم رم آزاد و مصرفی"
  },
  {
    "cat": "system",
    "cmd": "vmstat",
    "desc": "آمار سیستم (CPU, RAM, IO)"
  },
  {
    "cat": "system",
    "cmd": "iostat",
    "desc": "آمار دیسک و IO"
  },
  {
    "cat": "system",
    "cmd": "nohup [cmd] &",
    "desc": "اجرای دستور در پس‌زمینه"
  },
  {
    "cat": "system",
    "cmd": "cmd &",
    "desc": "اجرای دستور در پس‌زمینه"
  },
  {
    "cat": "system",
    "cmd": "jobs",
    "desc": "نمایش پروسه‌های پس‌زمینه"
  },
  {
    "cat": "system",
    "cmd": "fg",
    "desc": "برگرداندن پروسه پس‌زمینه به جلو"
  },
  {
    "cat": "system",
    "cmd": "bg",
    "desc": "ارسال پروسه متوقف‌شده به پس‌زمینه"
  },
  {
    "cat": "system",
    "cmd": "clear",
    "desc": "پاک کردن صفحه ترمینال"
  },
  {
    "cat": "system",
    "cmd": "reset",
    "desc": "ریست کامل ترمینال"
  },
  {
    "cat": "system",
    "cmd": "history",
    "desc": "نمایش تاریخچه دستورات"
  },
  {
    "cat": "system",
    "cmd": "history -c",
    "desc": "پاک کردن تاریخچه"
  },
  {
    "cat": "system",
    "cmd": "env",
    "desc": "نمایش متغیرهای محیطی"
  },
  {
    "cat": "system",
    "cmd": "export VAR=value",
    "desc": "تعریف متغیر محیطی"
  },
  {
    "cat": "system",
    "cmd": "unset VAR",
    "desc": "حذف متغیر محیطی"
  },
  {
    "cat": "system",
    "cmd": "alias ll='ls -la'",
    "desc": "ساخت میانبر برای دستور"
  },
  {
    "cat": "system",
    "cmd": "unalias ll",
    "desc": "حذف یک میانبر"
  },
  {
    "cat": "system",
    "cmd": "echo $SHELL",
    "desc": "نمایش شل فعلی"
  },
  {
    "cat": "system",
    "cmd": "bash",
    "desc": "ورود به شل Bash"
  },
  {
    "cat": "system",
    "cmd": "exit",
    "desc": "خروج از ترمینال/شل"
  },
  {
    "cat": "system",
    "cmd": "shutdown",
    "desc": "خاموش کردن سیستم (در Termux کار نمی‌کند)"
  },
  {
    "cat": "system",
    "cmd": "reboot",
    "desc": "ریستارت (در Termux کار نمی‌کند)"
  },
  {
    "cat": "termux",
    "cmd": "termux-setup-storage",
    "desc": "دسترسی به حافظه گوشی"
  },
  {
    "cat": "termux",
    "cmd": "termux-wake-lock",
    "desc": "جلوگیری از خواب گوشی"
  },
  {
    "cat": "termux",
    "cmd": "termux-wake-unlock",
    "desc": "آزاد کردن قفل بیدارباش"
  },
  {
    "cat": "termux",
    "cmd": "termux-battery-status",
    "desc": "وضعیت باتری گوشی"
  },
  {
    "cat": "termux",
    "cmd": "termux-brightness 255",
    "desc": "تنظیم روشنایی صفحه (0-255)"
  },
  {
    "cat": "termux",
    "cmd": "termux-clipboard-get",
    "desc": "دریافت متن از کلیپ‌بورد"
  },
  {
    "cat": "termux",
    "cmd": "termux-clipboard-set \"text\"",
    "desc": "کپی متن به کلیپ‌بورد"
  },
  {
    "cat": "termux",
    "cmd": "termux-toast \"message\"",
    "desc": "نمایش پیام Toast"
  },
  {
    "cat": "termux",
    "cmd": "termux-toast -g top \"msg\"",
    "desc": "Toast در بالای صفحه"
  },
  {
    "cat": "termux",
    "cmd": "termux-vibrate -d 1000",
    "desc": "ویبره به مدت ۱ ثانیه"
  },
  {
    "cat": "termux",
    "cmd": "termux-vibrate -f",
    "desc": "ویبره نامحدود (تا لغو)"
  },
  {
    "cat": "termux",
    "cmd": "termux-notification -t \"Title\" -c \"Content\"",
    "desc": "ارسال نوتیفیکیشن"
  },
  {
    "cat": "termux",
    "cmd": "termux-notification-remove [id]",
    "desc": "حذف نوتیفیکیشن"
  },
  {
    "cat": "termux",
    "cmd": "termux-notification-list",
    "desc": "لیست نوتیفیکیشن‌ها"
  },
  {
    "cat": "termux",
    "cmd": "termux-open [file/url]",
    "desc": "باز کردن فایل یا URL"
  },
  {
    "cat": "termux",
    "cmd": "termux-open-url https://google.com",
    "desc": "باز کردن URL در مرورگر"
  },
  {
    "cat": "termux",
    "cmd": "termux-share [file]",
    "desc": "اشتراک‌گذاری فایل"
  },
  {
    "cat": "termux",
    "cmd": "termux-camera-photo [file.jpg]",
    "desc": "گرفتن عکس با دوربین"
  },
  {
    "cat": "termux",
    "cmd": "termux-camera-info",
    "desc": "اطلاعات دوربین‌ها"
  },
  {
    "cat": "termux",
    "cmd": "termux-location",
    "desc": "دریافت مختصات GPS"
  },
  {
    "cat": "termux",
    "cmd": "termux-location -p network",
    "desc": "GPS با شبکه (نه ماهواره)"
  },
  {
    "cat": "termux",
    "cmd": "termux-sms-list",
    "desc": "لیست پیامک‌ها"
  },
  {
    "cat": "termux",
    "cmd": "termux-sms-send -n [number] \"text\"",
    "desc": "ارسال پیامک"
  },
  {
    "cat": "termux",
    "cmd": "termux-contact-list",
    "desc": "لیست مخاطبین"
  },
  {
    "cat": "termux",
    "cmd": "termux-call-log",
    "desc": "لاگ تماس‌ها"
  },
  {
    "cat": "termux",
    "cmd": "termux-telephony-deviceinfo",
    "desc": "اطلاعات سیم‌کارت"
  },
  {
    "cat": "termux",
    "cmd": "termux-wifi-scaninfo",
    "desc": "اسکن شبکه‌های WiFi"
  },
  {
    "cat": "termux",
    "cmd": "termux-wifi-connectioninfo",
    "desc": "اطلاعات اتصال WiFi فعلی"
  },
  {
    "cat": "termux",
    "cmd": "termux-wifi-enable true",
    "desc": "روشن کردن WiFi"
  },
  {
    "cat": "termux",
    "cmd": "termux-wifi-enable false",
    "desc": "خاموش کردن WiFi"
  },
  {
    "cat": "termux",
    "cmd": "termux-audio-info",
    "desc": "اطلاعات سیستم صدا"
  },
  {
    "cat": "termux",
    "cmd": "termux-media-player play [file]",
    "desc": "پخش فایل صوتی"
  },
  {
    "cat": "termux",
    "cmd": "termux-media-player stop",
    "desc": "توقف پخش"
  },
  {
    "cat": "termux",
    "cmd": "termux-torch on",
    "desc": "روشن کردن فلش دوربین"
  },
  {
    "cat": "termux",
    "cmd": "termux-torch off",
    "desc": "خاموش کردن فلش"
  },
  {
    "cat": "termux",
    "cmd": "termux-fingerprint",
    "desc": "تست اثر انگشت"
  },
  {
    "cat": "termux",
    "cmd": "termux-keystore list",
    "desc": "لیست کلیدهای امن"
  },
  {
    "cat": "termux",
    "cmd": "termux-tts-speak \"Hello\"",
    "desc": "تبدیل متن به گفتار"
  },
  {
    "cat": "termux",
    "cmd": "termux-storage-get [file]",
    "desc": "دریافت فایل از حافظه"
  },
  {
    "cat": "termux",
    "cmd": "termux-download [url]",
    "desc": "دانلود با مدیر دانلود اندروید"
  },
  {
    "cat": "termux",
    "cmd": "termux-fix-shebang [file]",
    "desc": "اصلاح shebang اسکریپت"
  },
  {
    "cat": "termux",
    "cmd": "termux-info",
    "desc": "اطلاعات کامل Termux و گوشی"
  },
  {
    "cat": "termux",
    "cmd": "termux-reload-settings",
    "desc": "بارگذاری مجدد تنظیمات"
  },
  {
    "cat": "dev",
    "cmd": "python",
    "desc": "ورود به محیط Python 3"
  },
  {
    "cat": "dev",
    "cmd": "python3 script.py",
    "desc": "اجرای اسکریپت پایتون"
  },
  {
    "cat": "dev",
    "cmd": "python3 -m http.server 8000",
    "desc": "سرور HTTP محلی روی پورت 8000"
  },
  {
    "cat": "dev",
    "cmd": "python3 -m venv venv",
    "desc": "ساخت محیط مجازی پایتون"
  },
  {
    "cat": "dev",
    "cmd": "source venv/bin/activate",
    "desc": "فعال‌سازی محیط مجازی"
  },
  {
    "cat": "dev",
    "cmd": "deactivate",
    "desc": "خروج از محیط مجازی"
  },
  {
    "cat": "dev",
    "cmd": "pip install [package]",
    "desc": "نصب کتابخانه پایتون"
  },
  {
    "cat": "dev",
    "cmd": "pip install -r requirements.txt",
    "desc": "نصب تمام پکیج‌های پروژه"
  },
  {
    "cat": "dev",
    "cmd": "pip list",
    "desc": "لیست پکیج‌های نصب‌شده"
  },
  {
    "cat": "dev",
    "cmd": "pip freeze > requirements.txt",
    "desc": "ذخیره لیست پکیج‌ها"
  },
  {
    "cat": "dev",
    "cmd": "python3 -m pip install --upgrade pip",
    "desc": "به‌روزرسانی pip"
  },
  {
    "cat": "dev",
    "cmd": "node",
    "desc": "ورود به محیط Node.js"
  },
  {
    "cat": "dev",
    "cmd": "node script.js",
    "desc": "اجرای فایل جاوااسکریپت"
  },
  {
    "cat": "dev",
    "cmd": "npm init -y",
    "desc": "ساخت پروژه Node بدون سوال"
  },
  {
    "cat": "dev",
    "cmd": "npm install [package]",
    "desc": "نصب پکیج Node"
  },
  {
    "cat": "dev",
    "cmd": "npm install -g [package]",
    "desc": "نصب پکیج به صورت global"
  },
  {
    "cat": "dev",
    "cmd": "npm start",
    "desc": "اجرای اسکریپت start"
  },
  {
    "cat": "dev",
    "cmd": "npm run [script]",
    "desc": "اجرای اسکریپت دلخواه"
  },
  {
    "cat": "dev",
    "cmd": "npm update",
    "desc": "به‌روزرسانی پکیج‌ها"
  },
  {
    "cat": "dev",
    "cmd": "npx [package]",
    "desc": "اجرای پکیج بدون نصب دائمی"
  },
  {
    "cat": "dev",
    "cmd": "yarn install",
    "desc": "نصب با yarn"
  },
  {
    "cat": "dev",
    "cmd": "yarn start",
    "desc": "شروع با yarn"
  },
  {
    "cat": "dev",
    "cmd": "git init",
    "desc": "ساخت مخزن گیت جدید"
  },
  {
    "cat": "dev",
    "cmd": "git clone [url]",
    "desc": "دریافت مخزن گیت"
  },
  {
    "cat": "dev",
    "cmd": "git clone --depth 1 [url]",
    "desc": "کلون سریع (فقط آخرین کامیت)"
  },
  {
    "cat": "dev",
    "cmd": "git status",
    "desc": "وضعیت فایل‌ها"
  },
  {
    "cat": "dev",
    "cmd": "git add .",
    "desc": "افزودن تمام تغییرات به staging"
  },
  {
    "cat": "dev",
    "cmd": "git add [file]",
    "desc": "افزودن فایل خاص"
  },
  {
    "cat": "dev",
    "cmd": "git commit -m \"msg\"",
    "desc": "ثبت تغییرات با پیام"
  },
  {
    "cat": "dev",
    "cmd": "git push",
    "desc": "ارسال تغییرات به سرور"
  },
  {
    "cat": "dev",
    "cmd": "git pull",
    "desc": "دریافت آخرین تغییرات"
  },
  {
    "cat": "dev",
    "cmd": "git fetch",
    "desc": "دریافت تغییرات بدون merge"
  },
  {
    "cat": "dev",
    "cmd": "git branch",
    "desc": "لیست شاخه‌ها"
  },
  {
    "cat": "dev",
    "cmd": "git checkout -b [branch]",
    "desc": "ساخت و رفتن به شاخه جدید"
  },
  {
    "cat": "dev",
    "cmd": "git merge [branch]",
    "desc": "ادغام شاخه"
  },
  {
    "cat": "dev",
    "cmd": "git log --oneline -10",
    "desc": "نمایش ۱۰ کامیت آخر"
  },
  {
    "cat": "dev",
    "cmd": "git diff",
    "desc": "نمایش تفاوت‌های تغییر یافته"
  },
  {
    "cat": "dev",
    "cmd": "git stash",
    "desc": "ذخیره موقت تغییرات"
  },
  {
    "cat": "dev",
    "cmd": "git reset --hard HEAD",
    "desc": "برگشت به آخرین کامیت"
  },
  {
    "cat": "dev",
    "cmd": "gcc [file.c] -o output",
    "desc": "کامپایل کد C"
  },
  {
    "cat": "dev",
    "cmd": "g++ [file.cpp] -o output",
    "desc": "کامپایل کد C++"
  },
  {
    "cat": "dev",
    "cmd": "make",
    "desc": "اجرای Makefile"
  },
  {
    "cat": "dev",
    "cmd": "make install",
    "desc": "نصب با make"
  },
  {
    "cat": "dev",
    "cmd": "php -S localhost:8000",
    "desc": "سرور محلی PHP"
  },
  {
    "cat": "dev",
    "cmd": "php script.php",
    "desc": "اجرای فایل PHP"
  },
  {
    "cat": "dev",
    "cmd": "go run main.go",
    "desc": "اجرای برنامه Go"
  },
  {
    "cat": "dev",
    "cmd": "cargo run",
    "desc": "اجرای پروژه Rust"
  },
  {
    "cat": "dev",
    "cmd": "ruby script.rb",
    "desc": "اجرای اسکریپت Ruby"
  },
  {
    "cat": "dev",
    "cmd": "java Main",
    "desc": "اجرای فایل کامپایل‌شده Java"
  },
  {
    "cat": "dev",
    "cmd": "tsc [file.ts]",
    "desc": "کامپایل TypeScript"
  },
  {
    "cat": "text",
    "cmd": "echo \"text\"",
    "desc": "چاپ متن روی صفحه"
  },
  {
    "cat": "text",
    "cmd": "echo $VAR",
    "desc": "چاپ مقدار متغیر"
  },
  {
    "cat": "text",
    "cmd": "echo \"text\" > file.txt",
    "desc": "نوشتن متن در فایل (جایگزینی)"
  },
  {
    "cat": "text",
    "cmd": "echo \"text\" >> file.txt",
    "desc": "افزودن به انتهای فایل"
  },
  {
    "cat": "text",
    "cmd": "grep \"pattern\" [file]",
    "desc": "جستجوی متن در فایل"
  },
  {
    "cat": "text",
    "cmd": "grep -r \"pattern\" .",
    "desc": "جستجوی بازگشتی در پوشه"
  },
  {
    "cat": "text",
    "cmd": "grep -i \"pattern\" [file]",
    "desc": "جستجوی غیرحساس به حروف"
  },
  {
    "cat": "text",
    "cmd": "grep -n \"pattern\" [file]",
    "desc": "جستجو با شماره خط"
  },
  {
    "cat": "text",
    "cmd": "grep -v \"pattern\" [file]",
    "desc": "حذف خطوط مطابق"
  },
  {
    "cat": "text",
    "cmd": "grep -E \"pat1|pat2\" [file]",
    "desc": "جستجوی چند الگو با regex"
  },
  {
    "cat": "text",
    "cmd": "sed 's/old/new/g' [file]",
    "desc": "جایگزینی متن در فایل"
  },
  {
    "cat": "text",
    "cmd": "sed 's/old/new/g' [file] > new",
    "desc": "ذخیره جایگزینی در فایل جدید"
  },
  {
    "cat": "text",
    "cmd": "sed -i 's/old/new/g' [file]",
    "desc": "جایگزینی در خود فایل"
  },
  {
    "cat": "text",
    "cmd": "sed -n '10,20p' [file]",
    "desc": "چاپ خطوط ۱۰ تا ۲۰"
  },
  {
    "cat": "text",
    "cmd": "awk '{print $1}' [file]",
    "desc": "استخراج ستون اول"
  },
  {
    "cat": "text",
    "cmd": "awk -F',' '{print $2}' [file]",
    "desc": "استخراج ستون دوم با کاما"
  },
  {
    "cat": "text",
    "cmd": "awk '/pattern/ {print}' [file]",
    "desc": "چاپ خطوط مطابق با الگو"
  },
  {
    "cat": "text",
    "cmd": "sort [file]",
    "desc": "مرتب‌سازی خطوط"
  },
  {
    "cat": "text",
    "cmd": "sort -n [file]",
    "desc": "مرتب‌سازی عددی"
  },
  {
    "cat": "text",
    "cmd": "sort -r [file]",
    "desc": "مرتب‌سازی نزولی"
  },
  {
    "cat": "text",
    "cmd": "uniq [file]",
    "desc": "حذف خطوط تکراری"
  },
  {
    "cat": "text",
    "cmd": "uniq -c [file]",
    "desc": "شمارش خطوط تکراری"
  },
  {
    "cat": "text",
    "cmd": "wc [file]",
    "desc": "شمارش خطوط، کلمات و کاراکترها"
  },
  {
    "cat": "text",
    "cmd": "wc -l [file]",
    "desc": "شمارش خطوط"
  },
  {
    "cat": "text",
    "cmd": "wc -w [file]",
    "desc": "شمارش کلمات"
  },
  {
    "cat": "text",
    "cmd": "wc -c [file]",
    "desc": "شمارش بایت‌ها"
  },
  {
    "cat": "text",
    "cmd": "diff [file1] [file2]",
    "desc": "مقایسه دو فایل"
  },
  {
    "cat": "text",
    "cmd": "diff -u [file1] [file2]",
    "desc": "مقایسه با فرمت unified"
  },
  {
    "cat": "text",
    "cmd": "cut -d',' -f1 [file]",
    "desc": "برش ستون با جداکننده"
  },
  {
    "cat": "text",
    "cmd": "tr 'a-z' 'A-Z' < file",
    "desc": "تبدیل حروف کوچک به بزرگ"
  },
  {
    "cat": "text",
    "cmd": "tr -d '\\n' < file",
    "desc": "حذف خطوط جدید"
  },
  {
    "cat": "text",
    "cmd": "paste file1 file2",
    "desc": "چسباندن دو فایل کنار هم"
  },
  {
    "cat": "text",
    "cmd": "split -l 100 [file]",
    "desc": "تقسیم فایل به تکه‌های ۱۰۰ خطی"
  },
  {
    "cat": "text",
    "cmd": "cat file | grep pattern",
    "desc": "ترکیب دو دستور با pipe"
  },
  {
    "cat": "text",
    "cmd": "cat file | sort | uniq -c",
    "desc": "شمارش خطوط تکراری مرتب‌شده"
  },
  {
    "cat": "text",
    "cmd": "head -n 5 [file] | tail -n 2",
    "desc": "چاپ خطوط ۴ و ۵"
  },
  {
    "cat": "compress",
    "cmd": "tar -cvf archive.tar [files]",
    "desc": "ساخت آرشیو tar"
  },
  {
    "cat": "compress",
    "cmd": "tar -xvf archive.tar",
    "desc": "استخراج آرشیو tar"
  },
  {
    "cat": "compress",
    "cmd": "tar -tvf archive.tar",
    "desc": "نمایش محتوای آرشیو بدون استخراج"
  },
  {
    "cat": "compress",
    "cmd": "tar -czvf archive.tar.gz [dir]",
    "desc": "ساخت آرشیو tar.gz"
  },
  {
    "cat": "compress",
    "cmd": "tar -xzvf archive.tar.gz",
    "desc": "استخراج tar.gz"
  },
  {
    "cat": "compress",
    "cmd": "tar -cjvf archive.tar.bz2 [dir]",
    "desc": "ساخت آرشیو tar.bz2"
  },
  {
    "cat": "compress",
    "cmd": "tar -xjvf archive.tar.bz2",
    "desc": "استخراج tar.bz2"
  },
  {
    "cat": "compress",
    "cmd": "tar -cJvf archive.tar.xz [dir]",
    "desc": "ساخت آرشیو tar.xz"
  },
  {
    "cat": "compress",
    "cmd": "tar -xJvf archive.tar.xz",
    "desc": "استخراج tar.xz"
  },
  {
    "cat": "compress",
    "cmd": "zip -r archive.zip [dir]",
    "desc": "ساخت فایل zip"
  },
  {
    "cat": "compress",
    "cmd": "zip -r -P pass archive.zip [dir]",
    "desc": "ساخت zip با رمز"
  },
  {
    "cat": "compress",
    "cmd": "unzip archive.zip",
    "desc": "استخراج zip"
  },
  {
    "cat": "compress",
    "cmd": "unzip -l archive.zip",
    "desc": "لیست محتوای zip"
  },
  {
    "cat": "compress",
    "cmd": "unzip -P pass archive.zip",
    "desc": "استخراج zip با رمز"
  },
  {
    "cat": "compress",
    "cmd": "gzip [file]",
    "desc": "فشرده‌سازی فایل"
  },
  {
    "cat": "compress",
    "cmd": "gzip -d [file.gz]",
    "desc": "استخراج فایل گزیپ"
  },
  {
    "cat": "compress",
    "cmd": "gunzip [file.gz]",
    "desc": "معادل gzip -d"
  },
  {
    "cat": "compress",
    "cmd": "bzip2 [file]",
    "desc": "فشرده‌سازی با bzip2"
  },
  {
    "cat": "compress",
    "cmd": "bunzip2 [file.bz2]",
    "desc": "استخراج bzip2"
  },
  {
    "cat": "compress",
    "cmd": "xz [file]",
    "desc": "فشرده‌سازی با xz"
  },
  {
    "cat": "compress",
    "cmd": "unxz [file.xz]",
    "desc": "استخراج xz"
  },
  {
    "cat": "compress",
    "cmd": "7z a archive.7z [dir]",
    "desc": "ساخت 7z (نیاز به نصب p7zip)"
  },
  {
    "cat": "compress",
    "cmd": "7z x archive.7z",
    "desc": "استخراج 7z"
  },
  {
    "cat": "security",
    "cmd": "sha256sum [file]",
    "desc": "محاسبه هش SHA-256"
  },
  {
    "cat": "security",
    "cmd": "sha1sum [file]",
    "desc": "محاسبه هش SHA-1"
  },
  {
    "cat": "security",
    "cmd": "md5sum [file]",
    "desc": "محاسبه هش MD5"
  },
  {
    "cat": "security",
    "cmd": "sha256sum [file] > file.sha256",
    "desc": "ذخیره هش در فایل"
  },
  {
    "cat": "security",
    "cmd": "sha256sum -c file.sha256",
    "desc": "بررسی صحت با هش ذخیره‌شده"
  },
  {
    "cat": "security",
    "cmd": "openssl rand -hex 32",
    "desc": "تولید ۳۲ بایت تصادفی به هگز"
  },
  {
    "cat": "security",
    "cmd": "openssl enc -aes-256-cbc -in file",
    "desc": "رمزنگاری AES-256"
  },
  {
    "cat": "security",
    "cmd": "openssl enc -d -aes-256-cbc -in file",
    "desc": "رمزگشایی AES-256"
  },
  {
    "cat": "security",
    "cmd": "openssl enc -aes-256-cbc -pbkdf2 -in file",
    "desc": "رمزنگاری با PBKDF2 (مدرن‌تر)"
  },
  {
    "cat": "security",
    "cmd": "openssl genrsa -out key.pem 4096",
    "desc": "ساخت کلید RSA 4096 بیتی"
  },
  {
    "cat": "security",
    "cmd": "openssl req -new -key key.pem -out csr.pem",
    "desc": "ساخت CSR برای SSL"
  },
  {
    "cat": "security",
    "cmd": "gpg --gen-key",
    "desc": "ساخت کلید رمزنگاری GPG"
  },
  {
    "cat": "security",
    "cmd": "gpg -e -r [email] [file]",
    "desc": "رمزنگاری فایل با GPG"
  },
  {
    "cat": "security",
    "cmd": "gpg -d [file.gpg]",
    "desc": "رمزگشایی فایل با GPG"
  },
  {
    "cat": "security",
    "cmd": "gpg --list-keys",
    "desc": "لیست کلیدهای GPG"
  },
  {
    "cat": "security",
    "cmd": "passwd",
    "desc": "تغییر رمز عبور کاربر"
  },
  {
    "cat": "security",
    "cmd": "ssh-keygen -lf ~/.ssh/id_ed25519.pub",
    "desc": "نمایش اثر انگشت کلید"
  },
  {
    "cat": "security",
    "cmd": "chmod 600 ~/.ssh/id_ed25519",
    "desc": "محدود کردن دسترسی کلید خصوصی"
  },
  {
    "cat": "security",
    "cmd": "base64 [file]",
    "desc": "تبدیل به Base64"
  },
  {
    "cat": "security",
    "cmd": "base64 -d [file.b64]",
    "desc": "رمزگشایی Base64"
  },
  {
    "cat": "fun",
    "cmd": "cmatrix",
    "desc": "افکت ماتریکس"
  },
  {
    "cat": "fun",
    "cmd": "cowsay \"Hello\"",
    "desc": "گاو که پیام شما رو می‌گه"
  },
  {
    "cat": "fun",
    "cmd": "cowthink \"Hello\"",
    "desc": "گاو در حال فکر کردن"
  },
  {
    "cat": "fun",
    "cmd": "figlet \"Hello\"",
    "desc": "تبدیل متن به حروف بزرگ هنری"
  },
  {
    "cat": "fun",
    "cmd": "figlet -f slant \"Hi\"",
    "desc": "با فونت slant"
  },
  {
    "cat": "fun",
    "cmd": "toilet \"Hello\"",
    "desc": "نسخه رنگی figlet"
  },
  {
    "cat": "fun",
    "cmd": "neofetch",
    "desc": "اطلاعات سیستم با گرافیک"
  },
  {
    "cat": "fun",
    "cmd": "neofetch --off",
    "desc": "بدون لوگو"
  },
  {
    "cat": "fun",
    "cmd": "sl",
    "desc": "قطار بخار"
  },
  {
    "cat": "fun",
    "cmd": "fortune",
    "desc": "جمله تصادفی"
  },
  {
    "cat": "fun",
    "cmd": "fortune | cowsay",
    "desc": "جمله تصادفی از دهان گاو"
  },
  {
    "cat": "fun",
    "cmd": "lolcat [file]",
    "desc": "نمایش فایل با رنگین‌کمان"
  },
  {
    "cat": "fun",
    "cmd": "yes | lolcat",
    "desc": "رنگین‌کمان بی‌نهایت"
  },
  {
    "cat": "fun",
    "cmd": "aafire",
    "desc": "افکت آتش ASCII"
  },
  {
    "cat": "fun",
    "cmd": "bb",
    "desc": "انیمیشن ASCII"
  },
  {
    "cat": "fun",
    "cmd": "rev [file]",
    "desc": "معکوس کردن متن"
  },
  {
    "cat": "fun",
    "cmd": "banner \"Hello\"",
    "desc": "نمایش با حروف بزرگ"
  },
  {
    "cat": "fun",
    "cmd": "espeak \"hello\"",
    "desc": "تبدیل متن به صدا"
  },
  {
    "cat": "fun",
    "cmd": "hollywood",
    "desc": "افکت هالیوود (نیاز به نصب)"
  },
  {
    "cat": "debug",
    "cmd": "time [cmd]",
    "desc": "اندازه‌گیری زمان اجرا"
  },
  {
    "cat": "debug",
    "cmd": "time -v [cmd]",
    "desc": "اندازه‌گیری دقیق‌تر"
  },
  {
    "cat": "debug",
    "cmd": "watch [cmd]",
    "desc": "اجرای دستور هر ۲ ثانیه"
  },
  {
    "cat": "debug",
    "cmd": "watch -n 5 [cmd]",
    "desc": "هر ۵ ثانیه"
  },
  {
    "cat": "debug",
    "cmd": "strace [cmd]",
    "desc": "ردیابی سیستمی برنامه"
  },
  {
    "cat": "debug",
    "cmd": "strace -e trace=file [cmd]",
    "desc": "ردیابی فقط فایل‌ها"
  },
  {
    "cat": "debug",
    "cmd": "ltrace [cmd]",
    "desc": "ردیابی فراخوانی کتابخانه‌ها"
  },
  {
    "cat": "debug",
    "cmd": "xargs",
    "desc": "اجرای دستور برای هر خط ورودی"
  },
  {
    "cat": "debug",
    "cmd": "find . -name \"*.txt\" | xargs rm",
    "desc": "حذف فایل‌های پیدا شده"
  },
  {
    "cat": "debug",
    "cmd": "tee [file]",
    "desc": "نوشتن خروجی همزمان به فایل و صفحه"
  },
  {
    "cat": "debug",
    "cmd": "cmd | tee output.log",
    "desc": "ذخیره خروجی در لاگ"
  },
  {
    "cat": "debug",
    "cmd": "source [file]",
    "desc": "اجرای دستورات یک فایل"
  },
  {
    "cat": "debug",
    "cmd": "bash -x script.sh",
    "desc": "اجرای اسکریپت با نمایش هر خط"
  },
  {
    "cat": "debug",
    "cmd": "set -x",
    "desc": "فعال‌سازی دیباگ در اسکریپت"
  },
  {
    "cat": "debug",
    "cmd": "set +x",
    "desc": "غیرفعال‌سازی دیباگ"
  },
  {
    "cat": "download",
    "cmd": "youtube-dl [url]",
    "desc": "دانلود از یوتیوب (نیاز به نصب)"
  },
  {
    "cat": "download",
    "cmd": "youtube-dl -f best [url]",
    "desc": "دانلود با بهترین کیفیت"
  },
  {
    "cat": "download",
    "cmd": "youtube-dl -x --audio-format mp3 [url]",
    "desc": "استخراج فقط صدا به MP3"
  },
  {
    "cat": "download",
    "cmd": "yt-dlp [url]",
    "desc": "جانشین مدرن youtube-dl"
  },
  {
    "cat": "download",
    "cmd": "yt-dlp -f \"bestvideo+bestaudio\" [url]",
    "desc": "دانلود ویدیو با بهترین کیفیت"
  },
  {
    "cat": "download",
    "cmd": "aria2c [url]",
    "desc": "دانلود سریع با aria2"
  },
  {
    "cat": "download",
    "cmd": "aria2c -x 16 [url]",
    "desc": "دانلود با ۱۶ اتصال همزمان"
  },
  {
    "cat": "download",
    "cmd": "aria2c -i urls.txt",
    "desc": "دانلود لیستی از URLها"
  },
  {
    "cat": "download",
    "cmd": "wget -c --limit-rate=1m [url]",
    "desc": "دانلود با محدودیت سرعت ۱MB/s"
  },
  {
    "cat": "download",
    "cmd": "curl -C - -O [url]",
    "desc": "ادامه دانلود نیمه‌کاره با curl"
  },
  {
    "cat": "download",
    "cmd": "wget --user-agent=\"Mozilla\" [url]",
    "desc": "دانلود با User-Agent مرورگر"
  },
  {
    "cat": "download",
    "cmd": "torsocks wget [url]",
    "desc": "دانلود از طریق Tor"
  },
  {
    "cat": "media",
    "cmd": "ffmpeg -i input.mp4 output.avi",
    "desc": "تبدیل فرمت ویدیو"
  },
  {
    "cat": "media",
    "cmd": "ffmpeg -i input.mp4 -vf scale=1280:720 out.mp4",
    "desc": "تغییر اندازه ویدیو"
  },
  {
    "cat": "media",
    "cmd": "ffmpeg -i video.mp4 -vn audio.mp3",
    "desc": "استخراج صدا از ویدیو"
  },
  {
    "cat": "media",
    "cmd": "ffmpeg -i audio.mp3 -ar 44100 out.wav",
    "desc": "تبدیل MP3 به WAV"
  },
  {
    "cat": "media",
    "cmd": "ffmpeg -i img%d.jpg -r 1 video.mp4",
    "desc": "ساخت ویدیو از تصاویر"
  },
  {
    "cat": "media",
    "cmd": "ffmpeg -i video.mp4 -ss 00:00:10 -t 00:00:30 clip.mp4",
    "desc": "برش ویدیو (۱۰ تا ۴۰ ثانیه)"
  },
  {
    "cat": "media",
    "cmd": "ffprobe [file.mp4]",
    "desc": "اطلاعات فایل ویدیو"
  },
  {
    "cat": "media",
    "cmd": "sox input.wav output.mp3",
    "desc": "تبدیل فرمت صدا با sox"
  },
  {
    "cat": "media",
    "cmd": "identify [image.jpg]",
    "desc": "اطلاعات تصویر (ImageMagick)"
  },
  {
    "cat": "media",
    "cmd": "convert input.png output.jpg",
    "desc": "تبدیل فرمت تصویر"
  },
  {
    "cat": "media",
    "cmd": "convert -resize 800x600 in.jpg out.jpg",
    "desc": "تغییر اندازه تصویر"
  },
  {
    "cat": "media",
    "cmd": "mogrify -resize 50% *.jpg",
    "desc": "تغییر اندازه تمام JPGها به ۵۰٪"
  },
  {
    "cat": "media",
    "cmd": "termux-media-player play [file.mp3]",
    "desc": "پخش فایل صوتی"
  },
  {
    "cat": "media",
    "cmd": "mpv [video.mp4]",
    "desc": "پخش ویدیو (نیاز به نصب)"
  },
  {
    "cat": "media",
    "cmd": "cmus",
    "desc": "پخش‌کننده موزیک ترمینال (نیاز به نصب)"
  },
  {
    "cat": "cron",
    "cmd": "crontab -e",
    "desc": "ویرایش زمان‌بندی Cron"
  },
  {
    "cat": "cron",
    "cmd": "crontab -l",
    "desc": "لیست زمان‌بندی‌های Cron"
  },
  {
    "cat": "cron",
    "cmd": "crontab -r",
    "desc": "حذف تمام Cronها"
  },
  {
    "cat": "cron",
    "cmd": "crond",
    "desc": "اجرای سرویس Cron"
  },
  {
    "cat": "cron",
    "cmd": "pkill crond",
    "desc": "توقف سرویس Cron"
  },
  {
    "cat": "cron",
    "cmd": "* * * * * cmd",
    "desc": "اجرای cmd هر دقیقه"
  },
  {
    "cat": "cron",
    "cmd": "0 * * * * cmd",
    "desc": "اجرای cmd هر ساعت"
  },
  {
    "cat": "cron",
    "cmd": "0 0 * * * cmd",
    "desc": "اجرای cmd هر شب"
  },
  {
    "cat": "cron",
    "cmd": "0 0 * * 0 cmd",
    "desc": "اجرای cmd هر یکشنبه"
  },
  {
    "cat": "cron",
    "cmd": "0 8 * * 1-5 cmd",
    "desc": "اجرای cmd هر روز کاری ساعت ۸"
  },
  {
    "cat": "cron",
    "cmd": "@reboot cmd",
    "desc": "اجرای cmd هنگام روشن شدن"
  },
  {
    "cat": "cron",
    "cmd": "at now + 1 hour",
    "desc": "اجرای دستور در ۱ ساعت (نیاز به at)"
  },
  {
    "cat": "users",
    "cmd": "who",
    "desc": "کاربران لاگین‌کرده"
  },
  {
    "cat": "users",
    "cmd": "w",
    "desc": "کاربران و فعالیتشان"
  },
  {
    "cat": "users",
    "cmd": "last",
    "desc": "آخرین لاگین‌ها"
  },
  {
    "cat": "users",
    "cmd": "lastlog",
    "desc": "آخرین لاگین هر کاربر"
  },
  {
    "cat": "users",
    "cmd": "groups",
    "desc": "گروه‌های کاربر"
  },
  {
    "cat": "users",
    "cmd": "newgrp [group]",
    "desc": "تغییر گروه موقت"
  },
  {
    "cat": "users",
    "cmd": "sudo [cmd]",
    "desc": "اجرای دستور با دسترسی روت (در Termux معمولا نیاز نیست)"
  },
  {
    "cat": "users",
    "cmd": "su",
    "desc": "تغییر کاربر (در Termux معمولا نیاز نیست)"
  },
  {
    "cat": "users",
    "cmd": "umask",
    "desc": "نمایش مجوز پیش‌فرض فایل‌های جدید"
  },
  {
    "cat": "users",
    "cmd": "umask 022",
    "desc": "تنظیم مجوز پیش‌فرض"
  },
  {
    "cat": "storage",
    "cmd": "df -h",
    "desc": "نمایش فضای دیسک"
  },
  {
    "cat": "storage",
    "cmd": "df -i",
    "desc": "نمایش فضای inode"
  },
  {
    "cat": "storage",
    "cmd": "du -sh *",
    "desc": "حجم تمام فایل‌ها/پوشه‌های فعلی"
  },
  {
    "cat": "storage",
    "cmd": "du -h --max-depth=1",
    "desc": "حجم پوشه‌های سطح اول"
  },
  {
    "cat": "storage",
    "cmd": "du -ah | sort -rh | head",
    "desc": "بزرگ‌ترین فایل‌ها/پوشه‌ها"
  },
  {
    "cat": "storage",
    "cmd": "mount",
    "desc": "نمایش سیستم‌های فایل mount شده"
  },
  {
    "cat": "storage",
    "cmd": "lsblk",
    "desc": "نمایش بلوک‌های دیسک"
  },
  {
    "cat": "storage",
    "cmd": "findmnt",
    "desc": "اطلاعات دقیق mountها"
  },
  {
    "cat": "storage",
    "cmd": "ncdu",
    "desc": "بررسی تعاملی فضای دیسک (نیاز به نصب)"
  },
  {
    "cat": "storage",
    "cmd": "sync",
    "desc": "همگام‌سازی داده‌ها با دیسک"
  },
  {
    "cat": "popular",
    "cmd": "pkg install python nodejs git -y",
    "desc": "نصب ست پایه توسعه"
  },
  {
    "cat": "popular",
    "cmd": "pkg install vim nano -y",
    "desc": "نصب ویرایشگرها"
  },
  {
    "cat": "popular",
    "cmd": "pkg install curl wget -y",
    "desc": "نصب دانلودرها"
  },
  {
    "cat": "popular",
    "cmd": "pkg install openssh -y",
    "desc": "نصب SSH"
  },
  {
    "cat": "popular",
    "cmd": "pkg install rsync -y",
    "desc": "نصب rsync"
  },
  {
    "cat": "popular",
    "cmd": "pkg install htop -y",
    "desc": "نصب htop"
  },
  {
    "cat": "popular",
    "cmd": "pkg install tree -y",
    "desc": "نصب tree"
  },
  {
    "cat": "popular",
    "cmd": "pkg install jq -y",
    "desc": "نصب jq (پردازش JSON)"
  },
  {
    "cat": "popular",
    "cmd": "pkg install ffmpeg -y",
    "desc": "نصب ffmpeg"
  },
  {
    "cat": "popular",
    "cmd": "pkg install imagemagick -y",
    "desc": "نصب ImageMagick"
  },
  {
    "cat": "popular",
    "cmd": "pkg install termux-api -y",
    "desc": "نصب افزونه Termux API"
  },
  {
    "cat": "popular",
    "cmd": "pkg install zip unzip -y",
    "desc": "نصب zip و unzip"
  },
  {
    "cat": "popular",
    "cmd": "pkg install tar -y",
    "desc": "نصب tar"
  },
  {
    "cat": "popular",
    "cmd": "pkg install nano -y",
    "desc": "نصب ویرایشگر nano"
  },
  {
    "cat": "popular",
    "cmd": "pkg install neofetch -y",
    "desc": "نصب neofetch"
  },
  {
    "cat": "popular",
    "cmd": "pkg install cmatrix -y",
    "desc": "نصب cmatrix"
  },
  {
    "cat": "popular",
    "cmd": "pkg install figlet -y",
    "desc": "نصب figlet"
  },
  {
    "cat": "popular",
    "cmd": "pkg install tmux -y",
    "desc": "نصب tmux (مدیریت session)"
  },
  {
    "cat": "popular",
    "cmd": "pkg install zsh -y",
    "desc": "نصب شل zsh"
  },
  {
    "cat": "popular",
    "cmd": "pkg install fish -y",
    "desc": "نصب شل fish"
  },
  {
    "cat": "popular",
    "cmd": "pkg install yarn -y",
    "desc": "نصب yarn"
  },
  {
    "cat": "popular",
    "cmd": "pkg install php -y",
    "desc": "نصب PHP"
  },
  {
    "cat": "popular",
    "cmd": "pkg install ruby -y",
    "desc": "نصب Ruby"
  },
  {
    "cat": "popular",
    "cmd": "pkg install golang -y",
    "desc": "نصب Go"
  },
  {
    "cat": "popular",
    "cmd": "pkg install rust -y",
    "desc": "نصب Rust"
  },
  {
    "cat": "tmux",
    "cmd": "tmux",
    "desc": "ورود به tmux"
  },
  {
    "cat": "tmux",
    "cmd": "tmux new -s [name]",
    "desc": "ساخت session با نام"
  },
  {
    "cat": "tmux",
    "cmd": "tmux ls",
    "desc": "لیست sessionها"
  },
  {
    "cat": "tmux",
    "cmd": "tmux attach -t [name]",
    "desc": "اتصال به session"
  },
  {
    "cat": "tmux",
    "cmd": "tmux kill-session -t [name]",
    "desc": "کشتن session"
  },
  {
    "cat": "tmux",
    "cmd": "Ctrl+b d",
    "desc": "خروج موقت از tmux"
  },
  {
    "cat": "tmux",
    "cmd": "Ctrl+b c",
    "desc": "ساخت پنجره جدید"
  },
  {
    "cat": "tmux",
    "cmd": "Ctrl+b n",
    "desc": "پنجره بعدی"
  },
  {
    "cat": "tmux",
    "cmd": "Ctrl+b p",
    "desc": "پنجره قبلی"
  },
  {
    "cat": "tmux",
    "cmd": "Ctrl+b %",
    "desc": "تقسیم عمودی"
  },
  {
    "cat": "tmux",
    "cmd": "Ctrl+b \"",
    "desc": "تقسیم افقی"
  },
  {
    "cat": "tmux",
    "cmd": "Ctrl+b arrow",
    "desc": "جابجایی بین پنل‌ها"
  },
  {
    "cat": "office",
    "cmd": "pdftotext [file.pdf] [out.txt]",
    "desc": "استخراج متن از PDF"
  },
  {
    "cat": "office",
    "cmd": "pdftoppm [file.pdf] image",
    "desc": "تبدیل PDF به تصویر"
  },
  {
    "cat": "office",
    "cmd": "pandoc [file.md] -o [file.pdf]",
    "desc": "تبدیل Markdown به PDF"
  },
  {
    "cat": "office",
    "cmd": "pandoc [file.docx] -o [file.md]",
    "desc": "تبدیل Word به Markdown"
  },
  {
    "cat": "office",
    "cmd": "libreoffice --headless --convert-to pdf [file.docx]",
    "desc": "تبدیل DOCX به PDF"
  },
  {
    "cat": "web",
    "cmd": "wget -r -l 1 -k -p [url]",
    "desc": "دانلود کامل صفحه وب"
  },
  {
    "cat": "web",
    "cmd": "curl -s [url] | grep [pattern]",
    "desc": "جستجو در HTML صفحه"
  },
  {
    "cat": "web",
    "cmd": "lynx [url]",
    "desc": "مرورگر متنی (نیاز به نصب)"
  },
  {
    "cat": "web",
    "cmd": "w3m [url]",
    "desc": "مرورگر متنی جایگزین"
  },
  {
    "cat": "web",
    "cmd": "links [url]",
    "desc": "مرورگر متنی دیگر"
  },
  {
    "cat": "web",
    "cmd": "npx serve",
    "desc": "سرور استاتیک محلی (Node)"
  },
  {
    "cat": "web",
    "cmd": "python -m http.server 8080",
    "desc": "سرور HTTP ساده"
  }
];

const categories = {
  pkg: {name: "📦 مدیریت پکیج‌ها", color: "#8b5cf6", count: 30},
  files: {name: "📁 فایل‌ها و پوشه‌ها", color: "#0ea5e9", count: 52},
  network: {name: "🌐 شبکه", color: "#10b981", count: 41},
  system: {name: "🔧 سیستم و پروسه‌ها", color: "#f59e0b", count: 38},
  termux: {name: "⚡ میانبرهای Termux", color: "#ec4899", count: 43},
  dev: {name: "💻 برنامه‌نویسی", color: "#6366f1", count: 50},
  text: {name: "📝 پردازش متن", color: "#14b8a6", count: 36},
  compress: {name: "🗜️ فشرده‌سازی", color: "#f97316", count: 23},
  security: {name: "🔐 امنیت", color: "#dc2626", count: 20},
  fun: {name: "🎮 سرگرمی", color: "#a855f7", count: 19},
  debug: {name: "🐛 دیباگ", color: "#64748b", count: 15},
  download: {name: "📥 دانلود", color: "#0891b2", count: 12},
  media: {name: "🎬 رسانه", color: "#d946ef", count: 15},
  cron: {name: "⏰ زمان‌بندی", color: "#ea580c", count: 12},
  users: {name: "👥 کاربران", color: "#4f46e5", count: 10},
  storage: {name: "💾 ذخیره‌سازی", color: "#0284c7", count: 10},
  popular: {name: "⭐ پکیج‌های پرکاربرد", color: "#facc15", count: 25},
  tmux: {name: "🪟 tmux", color: "#22c55e", count: 12},
  office: {name: "📄 ابزارهای اداری", color: "#7c3aed", count: 5},
  web: {name: "🕸️ ابزارهای وب", color: "#06b6d4", count: 7},
};
