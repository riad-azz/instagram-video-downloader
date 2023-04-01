// Navbar dropdown menu
try {
  (() => {
    const navMenu = document.getElementById("nav-menu");
    const navMenuBtn = document.getElementById("menu-button");

    const toggleMenu = () => {
      navMenu.classList.toggle("hidden");
    };

    navMenuBtn.onclick = toggleMenu;
  })();
} catch (error) {
  console.error(error);
}
// Theme button
try {
  (() => {
    const themeButton = document.getElementById("theme-button");

    const toggleTheme = () => {
      document.documentElement.classList.toggle("dark");
    };

    themeButton.onclick = toggleTheme;
  })();
} catch (error) {
  console.error(error);
}
// Download video
try {
  (() => {
    const downloadBtn = document.getElementById("download-button");
    const downloadBtnText = downloadBtn.querySelector("span");
    const urlInput = document.getElementById("url-input");
    const errorElement = document.getElementById("error-message");

    const showError = (error) => {
      errorElement.style.display = "block";
      errorElement.textContent = error;
    };

    const downloadFile = (url, filename = "insta-video.mp4") => {
      const anchor = document.createElement("a");
      anchor.style.display = "none";

      anchor.href = url;
      anchor.download = filename;

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };

    const handleResponse = async (response) => {
      const dataJson = await response.json();
      if (dataJson.error) {
        showError(dataJson.error);
      } else {
        errorElement.style.display = "none";
        const filename = "instagram_" + dataJson.id + ".mp4";
        const url = dataJson.url;
        downloadFile(url, filename);
      }
    };

    const handleError = (error) => {
      showError("Something went wrong. Make sure the video url is correct.");
    };

    const fetchVideo = async () => {
      downloadBtn.disabled = true;
      downloadBtnText.textContent = "Fetching...";
      const videoUrl = urlInput.value;
      if (videoUrl === "") {
        showError("Please provide an instagram post ID");
      } else {
        await fetch(`/api?id=${urlInput.value}`).then(
          handleResponse,
          handleError
        );
      }
      downloadBtn.disabled = false;
      downloadBtnText.textContent = "Download";
    };

    downloadBtn.onclick = fetchVideo;
  })();
} catch (error) {
  console.error(error);
}
