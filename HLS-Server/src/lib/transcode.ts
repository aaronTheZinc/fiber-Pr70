import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { rootDir } from "../";

type TranscodeVideoRequest = {
  fileDir: string;
  username: string;
  cb: (r: { error?: Error; urlExt: string | null, rootFolderName: string | null }) => void;
};

export const transcodeVideo = ({
  fileDir,
  username,
  cb,
}: TranscodeVideoRequest) => {
  const now = Date.now().toString();
  fs.access(`${rootDir}/hls/${username}/${now}`, (error) => {
    if (error) {
      fs.mkdir(
        `${rootDir}/hls/${username}/${now}`,
        { recursive: true },
        (err) => {
          console.log("mkdir err:", err);
        }
      );
    }
  });

  try {
    const command = ffmpeg(fileDir)
      .size("1920x1080")
      .outputOptions([
        "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
        "-level 3.0",
        // "-s 640x360", // 640px width, 360px height output video dimensions
        "-start_number 0", // start the first .ts segment at index 0
        "-hls_time 10", // 10 second segment duration
        "-hls_list_size 0", // Maxmimum number of playlist entries (0 means all entries/infinite)
        "-f hls",
      ])
      .output(`${rootDir}/hls/${username}/${now}/media.m3u8`)
      .on("progress", function (progress) {
        console.log("Processing: " + progress.percent + "% done");
      })
      .on("error", () => {
        console.log("ERR!!");
      })
      .on("end", function (err, stdout, stderr) {
        cb({ urlExt: `hls/${username}/${now}/media.m3u8`, rootFolderName: now });
      })
      .run();
  } catch (error) {
    console.log(error);
    return cb({ error, urlExt: null, rootFolderName: null });
  }
};
