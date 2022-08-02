const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
exports.transcodeVideo = ({ fileDir, username, cb }) => {
  const now = Date.now().toString();
  fs.access(`${__dirname}/hls/${username}/${now}`, (error) => {
    if (error) {
      console.log("creating dir");
      fs.mkdir(
        `${__dirname}/hls/${username}/${now}`,
        { recursive: true },
        (err) => {
          console.log("mkdir err:", err);
        }
      );
    }
  });

  try {
    const command = ffmpeg(fileDir)
      .audioCodec("libopus")
      .audioBitrate(96)
      .outputOptions([
        "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
        "-level 3.0",
        "-s 640x360", // 640px width, 360px height output video dimensions
        "-start_number 0", // start the first .ts segment at index 0
        "-hls_time 10", // 10 second segment duration
        "-hls_list_size 0", // Maxmimum number of playlist entries (0 means all entries/infinite)
        "-f hls",
      ])
      .output(`${__dirname}/hls/${username}/${now}/media.m3u8`)
      .on("progress", function (progress) {
        console.log("Processing: " + progress.percent + "% done");
      })
      .on("end", function (err, stdout, stderr) {
        cb({ urlExt: `hls/${username}/${now}/media.m3u8` });
      })
      .run();
  } catch (err) {
    return cb({ err });
  }
};
