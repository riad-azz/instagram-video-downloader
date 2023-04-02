// DOWNLOAD INSTAGRAM VIDEO
try {
  (() => {
    const downloadButton = document.getElementById("download-button");
    const downloadButtonText = downloadButton.querySelector("span");
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
      downloadButton.disabled = true;
      downloadButtonText.textContent = "Fetching...";
      const videoUrl = urlInput.value;
      if (videoUrl === "") {
        showError("Please provide an instagram post ID");
      } else {
        await fetch(`/api?id=${urlInput.value}`).then(
          handleResponse,
          handleError
        );
      }
      downloadButton.disabled = false;
      downloadButtonText.textContent = "Download";
    };

    downloadButton.onclick = fetchVideo;
  })();
} catch (error) {
  console.error(error);
}
