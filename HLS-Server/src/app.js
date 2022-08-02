const Uppy = require("@uppy/core");
const Dashboard = require("@uppy/dashboard");
const XHRUpload = require("@uppy/xhr-upload");
const WebCam = require("@uppy/webcam");

const video = document.getElementById("video");

const uppy = new Uppy()
  .use(Dashboard, {
    inline: true,
    target: "#drag-drop-area",
  })
  .use(XHRUpload, {
    endpoint: "/upload",
    fieldName: "content",
    formData: true,
  });

uppy.on("upload-success", (file, response) => {
  const httpStatus = response.status; // HTTP status code
  const httpBody = response.body; // extracted response data
  console.log(httpBody);
  const { urlExt } = httpBody;

  if (Hls.isSupported()) {
    const hls = new Hls();

    hls.loadSource(`/${urlExt}`);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play();
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  }
  // do something with file and response
});
