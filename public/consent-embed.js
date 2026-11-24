/* Shared opt-in loader for directly opened local map/widget documents. */
(() => {
  "use strict";
  const loader = document.currentScript;
  const category = loader.dataset.category;
  const key = "ith:cookie-consent:v1";
  let started = false;
  let timer;
  function stored() {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return value?.version === 1 && Number.isFinite(value.expiresAt) && value.expiresAt > Date.now() && value.expiresAt <= Date.now() + 180 * 86400000 + 60000
        && ["analytics", "external", "marketing"].every(key => typeof value.categories?.[key] === "boolean")
        && value.categories?.[category] === true ? value : null;
    } catch { return null; }
  }
  const message = document.createElement("div");
  message.style.cssText = "position:fixed;inset:0;z-index:9999;display:grid;place-content:center;padding:24px;text-align:center;background:#f2f6f9;color:#16283e;font:14px/1.6 system-ui";
  message.innerHTML = '<p>This content needs permission in Cookie settings.</p><a href="/#cookie-settings" target="_top" style="color:#0077a8">Cookie settings</a>';
  function checkWithdrawal() {
    if (started && !stored()) location.reload();
  }
  async function start() {
    if (started) return;
    started = true;
    message.remove();
    for (const link of document.querySelectorAll("link[data-consent-href]")) link.href = link.dataset.consentHref;
    for (const source of document.querySelectorAll('script[type="application/x-consent"]')) {
      const script = document.createElement("script");
      for (const attr of source.attributes) {
        if (!["type", "src", "data-consent-src"].includes(attr.name)) script.setAttribute(attr.name, attr.value);
      }
      if (source.dataset.consentSrc) {
        await new Promise(resolve => {
          script.onload = resolve;
          script.onerror = resolve;
          script.src = source.dataset.consentSrc;
          source.replaceWith(script);
        });
      } else {
        script.textContent = source.textContent;
        source.replaceWith(script);
      }
    }
  }
  function ready() {
    const value = stored();
    if (value) {
      start();
      const expire = () => { checkWithdrawal(); const current = stored(); if (current) timer = setTimeout(expire, Math.min(2147483647, current.expiresAt - Date.now() + 1)); };
      timer = setTimeout(expire, Math.min(2147483647, value.expiresAt - Date.now() + 1));
    } else document.body.appendChild(message);
  }
  addEventListener("message", event => {
    if (event.origin !== location.origin || event.source !== parent || parent === window) return;
    if (event.data?.type === "ith-embed-consent" && event.data.category === category && event.data.allowed === true) start();
  });
  addEventListener("storage", event => { if (event.key === key || event.key === null) checkWithdrawal(); });
  addEventListener("focus", checkWithdrawal);
  addEventListener("pagehide", () => clearTimeout(timer), { once: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready, { once: true }); else ready();
})();
