(function () {
  const scriptEl = document.currentScript;
  const expectedHash = scriptEl.dataset.hash;
  const storageKey = "gate-ok:" + expectedHash;

  const gate = document.getElementById("gate");
  const content = document.getElementById("content");
  const form = document.getElementById("gate-form");
  const input = document.getElementById("gate-input");
  const errorMsg = document.getElementById("gate-error");

  async function sha256Hex(text) {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function unlock() {
    gate.hidden = true;
    content.hidden = false;
  }

  if (sessionStorage.getItem(storageKey) === "1") {
    unlock();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const hash = await sha256Hex(input.value);
    if (hash === expectedHash) {
      sessionStorage.setItem(storageKey, "1");
      errorMsg.hidden = true;
      unlock();
    } else {
      errorMsg.hidden = false;
      input.value = "";
      input.focus();
    }
  });
})();
