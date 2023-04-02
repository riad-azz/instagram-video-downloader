// DOWNLOAD INSTAGRAM VIDEO
try {
  (() => {
    const downloadForm = document.getElementById("download-form");
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
      const json = await response.json();
      if (response.status !== 200) {
        showError(json.error);
        return;
      }
      errorElement.style.display = "none";
      const filename = "instagram_" + json.id + ".mp4";
      const video = json.videos.at(0);
      if (!video) {
        showError("This post does not have any videos");
      } else {
        const url = video.url;
        downloadFile(url, filename);
      }
    };

    const handleError = (error) => {
      showError("Something went wrong. Make sure the video url is correct.");
    };

    const fetchVideo = async () => {
      const postID = urlInput.value;
      if (postID === "") {
        showError("Please provide an instagram post ID");
      } else {
        await fetch(`/api?id=${urlInput.value}`).then(
          handleResponse,
          handleError
        );
      }
    };

    downloadForm.onsubmit = async (event) => {
      event.preventDefault();

      downloadButton.disabled = true;
      downloadButtonText.textContent = "Fetching...";

      await fetchVideo();

      downloadButton.disabled = false;
      downloadButtonText.textContent = "Download";
    };

    errorElement.style.display = "none";
  })();
} catch (error) {
  console.error(error);
}
