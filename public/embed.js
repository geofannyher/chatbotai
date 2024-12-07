(function () {
  const scriptTag = document.currentScript;
  const chatbotSrc = scriptTag.getAttribute("data-src");

  const button = document.createElement("img");
  button.src =
    "https://res.cloudinary.com/dcd1jeldi/image/upload/v1733550876/WhatsApp_Image_2024-12-06_at_11.18.19_PM_fqemyd.jpg";
  button.alt = "Chat";
  button.style.position = "fixed";
  button.style.objectFit = "cover";
  button.style.bottom = "35px";
  button.style.right = "20px";
  button.style.width = "60px";
  button.style.height = "60px";
  button.style.border = "none";
  button.style.borderRadius = "50%";
  button.style.cursor = "pointer";
  button.style.zIndex = "10000";
  button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

  const welcomeText = document.createElement("div");
  welcomeText.textContent =
    "Selamat datang! Azril di sini, anak magang virtual yang siap bantu Kakak ngeksplor dunia ekonomi kreatif Indonesia. Kalau cari info yang cepat, tepat, dan pastinya seru, Azril nih jagonya!";
  welcomeText.style.position = "fixed";
  welcomeText.style.fontFamily = "'Mulish', sans-serif";
  welcomeText.style.bottom = "100px";
  welcomeText.style.right = "20px";
  welcomeText.style.width = "350px";
  welcomeText.style.padding = "10px";
  welcomeText.style.backgroundColor = "#fff";
  welcomeText.style.color = "#333";
  welcomeText.style.fontSize = "11px";
  welcomeText.style.border = "1px solid #ddd";
  welcomeText.style.borderRadius = "10px";
  welcomeText.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  welcomeText.style.zIndex = "10000";
  welcomeText.style.textAlign = "left";

  document.body.appendChild(button);
  document.body.appendChild(welcomeText);

  button.addEventListener("click", function () {
    button.style.display = "none";
    welcomeText.style.display = "none";

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
    closeButton.style.bottom = "510px";
    closeButton.style.right = "10px";
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

      button.style.display = "block";
      welcomeText.style.display = "block";
    });

    document.body.appendChild(iframe);
    document.body.appendChild(closeButton);
  });
})();
