(function () {
  const scriptTag = document.currentScript;
  const chatbotSrc = scriptTag.getAttribute("data-src");

  const button = document.createElement("button");
  button.textContent = "Chat";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.border = "none";
  button.style.borderRadius = "50%";
  button.style.backgroundColor = "#0078d7";
  button.style.color = "#fff";
  button.style.fontSize = "16px";
  button.style.cursor = "pointer";
  button.style.zIndex = "10000";
  button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

  document.body.appendChild(button);

  button.addEventListener("click", function () {
    if (document.querySelector("iframe[data-chatbot]")) return;

    const iframe = document.createElement("iframe");
    iframe.src = chatbotSrc;
    iframe.style.position = "fixed";
    iframe.style.bottom = "20px";
    iframe.style.right = "20px";
    iframe.style.width = "350px";
    iframe.style.height = "500px";
    iframe.style.border = "none";
    iframe.style.zIndex = "10001";
    iframe.style.borderRadius = "10px";
    iframe.setAttribute("data-chatbot", "true");

    const closeButton = document.createElement("button");
    closeButton.textContent = "✕";
    closeButton.style.position = "fixed";
    closeButton.style.bottom = "530px";
    closeButton.style.right = "20px";
    closeButton.style.width = "30px";
    closeButton.style.height = "30px";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "50%";
    closeButton.style.backgroundColor = "#ff5c5c";
    closeButton.style.color = "#fff";
    closeButton.style.fontSize = "14px";
    closeButton.style.cursor = "pointer";
    closeButton.style.zIndex = "10002";

    closeButton.addEventListener("click", () => {
      iframe.remove();
      closeButton.remove();
    });

    document.body.appendChild(iframe);
    document.body.appendChild(closeButton);
  });
})();
