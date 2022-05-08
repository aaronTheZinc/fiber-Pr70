import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { DashboardModal } from "@uppy/react";
import { FileType } from "../../../types";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import Dropbox from "@uppy/dropbox";
import Instagram from "@uppy/instagram";
import Url from "@uppy/url";
import Audio from "@uppy/audio";
import ScreenCapture from "@uppy/screen-capture";
import Compress from "@uppy/compressor";
// import Webcam from "@uppy/webcam";

/**
 * a function that checks to make sure that the uploaded file is a jpg, jpeg, png, or a gif
 */
const IsImage = (extension: string) => extension.match(/.(jpg|jpeg|png|gif)$/i);

/**
 * 
 * a funciion that checks to make sure that the selected file is an mp3 file
 */
const isMusic = (extension: string) => {
  return extension === "mp3"
  /* let regex = new RegExp(/.(mp3)$/i)
  return regex.test(extension) */
} 

import { useCookies } from "react-cookie";


interface ModalProps {
  btnTitle: string;
  popUpText: string;
  elClassName: string;
  username: string;
  icon: string;
  origin: string;
  isQr: boolean;
  isSocial: boolean;
  isContact: boolean;
}

interface UppyModalProps {
  setUpload: (url: string, fileType: string) => void;
  basicFileType: string;
}

export const UppyModal = ({ setUpload, basicFileType }: UppyModalProps, string): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);
  const [fileType, setFileType] = useState<string>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const envType = process.env.NEXT_PUBLIC_ENVIRONMENT;
  
  const BASE_URL =
    envType == "dev" ? "http://localhost:7070" : "https://dev1.vreel.page";

  console.log("[media endpoint]", BASE_URL);
  const uppy = new Uppy({
    id: "uppy",
    autoProceed: false,
    allowMultipleUploadBatches: true,
    debug: false,
    restrictions: {
      maxNumberOfFiles: 1,
      // allowedFileTypes: ["image/*", "video/*"],
    },
    // .MP4, .M4P, .M4V
  });

  uppy.use(Tus, {
    endpoint: `${BASE_URL}/files/`,
    headers: {
      token: cookies.userAuthToken ? cookies.userAuthToken : null,
    },
  });

  // uppy.use(ScreenCapture)
  // uppy.use(Dropbox, { companionUrl: 'http://localhost:3020' })
  // uppy.use(Instagram,  { companionUrl: 'http://localhost:3020' });
  // uppy.use(Url,  { companionUrl: 'http://localhost:3020' });


  uppy.on("file-added", (file) => {

    // Makes sure that the selected file is an mp3 only is the basicFileType is music-related. If not, then the file gets removed
    if((basicFileType === "music" || basicFileType === "background audio") && isMusic(file.extension) === false){
      uppy.removeFile(file.id, "removed-by-user")
    } else {
      setFileType(file.type);
    }
  });

  // alerts the user that the selected file cannot go through because of it's extension
  uppy.on('file-removed', (file, reason) => {
  
    if (reason === 'removed-by-user' && (basicFileType === "music" || basicFileType === "background audio")) {
      alert(`sorry but ${file.name} has been rejected because it is not an mp3 file`)
    }
  })

  uppy.on("progress", (progress) => {
    // progress: integer (total progress percentage)
    if (progress === 100) {
      uppy.pauseAll();
      uppy.resumeAll();
    }
  });
  uppy.on("complete", (result) => {
    setOpen(false);
    setUpload(result.successful[0]?.uploadURL, fileType);
    console.log("setUpload", setUpload)
    console.log("response ->", result);

    // console.log('Upload complete! We’ve uploaded these files:', result.successful)
  });

  const { username } = router.query;

  const capitilizedUsername = username ? username[0] + username.slice(1) : null;

  useEffect(() => {
    setInterval(() => {
      uppy.retryAll();
    }, 5000);
  }, []);

  const onClick = () => { };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        type="button"
        style={{ width: "100%" }}
        className="vreel-edit-menu__button blue"
        onClick={() => setOpen(!open)}
      >
        Upload some {basicFileType}
      </button>
      <DashboardModal
        uppy={uppy}
        closeModalOnClickOutside
        open={open}
        onRequestClose={handleClose}
        plugins={["Dropbox", "Instagram", "Url"]}
      />
    </div>
  );
};
