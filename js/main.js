(function () {
  // 1) Default viewer source from ?pdf= param or cv.pdf
  const url = new URL(window.location.href);
  const pdfName = url.searchParams.get("pdf");
  const src = pdfName ? decodeURIComponent(pdfName) : "cv.pdf";
  const pdfURL = `${src}#view=FitH&toolbar=1&navpanes=0`;

  const obj = document.getElementById("pdfObject");
  const iframe = document.getElementById("pdfIframe");
  const link = document.getElementById("pdfFallbackLink");
  if (obj) obj.setAttribute("data", pdfURL);
  if (iframe) iframe.setAttribute("src", pdfURL);
  if (link) link.setAttribute("href", src);

  // 2) “Drag to see all PDF” — swap viewer on click
  document.querySelectorAll("[data-pdf]").forEach(el => {
    el.addEventListener("click", () => {
      const file = el.getAttribute("data-pdf");
      const newURL = `${file}#view=FitH&toolbar=1&navpanes=0`;
      if (obj) obj.setAttribute("data", newURL);
      if (iframe) iframe.setAttribute("src", newURL);

      // Update address bar (?pdf=) without page reload
      const u = new URL(window.location.href);
      u.searchParams.set("pdf", file);
      window.history.replaceState({}, "", u.toString());
    });
  });

  // 3) Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 4) iOS hint (embedded PDF sometimes opens native preview)
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS) {
    const hint = document.createElement("div");
    hint.className = "fallback";
    hint.innerHTML = `Having trouble on iOS? <a href="${src}">Open the PDF</a>.`;
    document.querySelector(".viewer-card").appendChild(hint);
  }
})();
