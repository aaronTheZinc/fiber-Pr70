const Uppy = require("@uppy/core");
const Dashboard = require("@uppy/dashboard");
const XHRUpload = require("@uppy/xhr-upload");
const WebCam = require("@uppy/webcam");
const video = document.getElementById("video");

if (Hls.isSupported()) {
  const hls = new Hls();

  hls.loadSource("https://hls-dev.vreel.page/hls/aaron/1661388536144/media.m3u8");
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

const token = prompt("token");

const uppy = new Uppy()
  .use(Dashboard, {
    inline: true,
    target: "#drag-drop-area",
  })
  .use(XHRUpload, {
    endpoint: "/upload",
    fieldName: "content",
    formData: true,
    headers: {
      token,
    },
  });

uppy.on("upload-success", (file, response) => {
  const httpStatus = response.status; // HTTP status code
  const httpBody = response.body; // extracted response data
  console.log(httpBody);
  const { urlExt } = httpBody;


  // do something with file and response
});
