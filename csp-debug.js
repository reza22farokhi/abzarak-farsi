(() => {
  if (!new URLSearchParams(location.search).has("cspdebug")) return;

  const lines = [];
  let panel;
  let checks = 0;

  function log(type, detail) {
    lines.push(
      `[${new Date().toISOString().slice(11, 19)}] ${type}: ${detail}`
    );
    if (lines.length > 90) lines.shift();
    if (panel) panel.textContent = lines.join("\n");
  }

  function safeURL(value) {
    try {
      const u = new URL(value, location.href);
      return u.origin + u.pathname;
    } catch {
      return String(value).slice(0, 160);
    }
  }

  function showPanel() {
    if (panel || !document.body) return;

    panel = document.createElement("pre");
    panel.id = "yektanet-csp-debug-panel";
    panel.style.cssText =
      "position:fixed;top:0;left:0;right:0;max-height:55vh;" +
      "overflow:auto;z-index:2147483647;margin:0;padding:10px;" +
      "background:#111827;color:white;font:12px monospace;" +
      "white-space:pre-wrap;overflow-wrap:anywhere";

    document.body.appendChild(panel);
    panel.textContent = lines.join("\n");
  }

  window.addEventListener("securitypolicyviolation", e => {
    log("CSP_BLOCK", JSON.stringify({
      directive: e.effectiveDirective,
      blocked: e.blockedURI,
      source: safeURL(e.sourceFile || ""),
      line: e.lineNumber,
      disposition: e.disposition
    }));
  });

  window.addEventListener("error", e => {
    if (e.target && e.target !== window) {
      log("RESOURCE_ERROR",
        safeURL(e.target.src || e.target.href || e.target.currentSrc || ""));
    } else {
      log("JS_ERROR",
        `${e.message || "unknown"} at line ${e.lineno || 0}`);
    }
  }, true);

  window.addEventListener("unhandledrejection", e => {
    log("PROMISE_ERROR", String(e.reason || "unknown"));
  });

  function inspect() {
    showPanel();

    const slot = document.getElementById("pos-article-display-123780");

    log("AD_SLOT", slot ? JSON.stringify({
      found: true,
      children: slot.childElementCount,
      height: Math.round(slot.getBoundingClientRect().height),
      htmlLength: slot.innerHTML.length,
      textLength: (slot.textContent || "").trim().length
    }) : "Placement element not found");

    const resources = performance.getEntriesByType("resource")
      .filter(r => /yektanet/i.test(r.name))
      .slice(-12)
      .map(r => `${safeURL(r.name)} (${Math.round(r.duration)}ms)`);

    log("YEKETANET_RESOURCES",
      resources.join(" | ") || "None observed");

    if (++checks < 6) setTimeout(inspect, 2500);
  }

  document.addEventListener("DOMContentLoaded", () => {
    showPanel();
    log("START", "Temporary diagnostics enabled");
    setTimeout(inspect, 1200);
  }, { once: true });
})();
