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

const IsImage = (extension: string) => extension.match(/.(jpg|jpeg|png|gif)$/i);

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
}
export const UppyModal = ({ setUpload }: UppyModalProps): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);
  const [fileType, setFileType] = useState<string>();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const uppy = new Uppy({
    id: "uppy",
    autoProceed: false,
    allowMultipleUploadBatches: true,
    debug: false,
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: ["image/*", "video/*"],
    },
    // .MP4, .M4P, .M4V
  });

  uppy.use(Tus, {
    endpoint: "http://localhost:7070/files/",
    headers: {
      token: cookies.userAuthToken ? cookies.userAuthToken : null,
    },
  });
  // uppy.use(ScreenCapture)
  // uppy.use(Dropbox, { companionUrl: 'http://localhost:3020' })
  // uppy.use(Instagram,  { companionUrl: 'http://localhost:3020' });
  // uppy.use(Url,  { companionUrl: 'http://localhost:3020' });

  uppy.on("file-added", (file) => {
    setFileType(file.type);
    alert(fileType);
  });

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
    console.log("response ->", result);

    // console.log('Upload complete! We’ve uploaded these files:', result.successful)
  });

  const { username } = router.query;

  const capitilizedUsername = username
    ? username[0].toUpperCase() + username.slice(1)
    : null;

  useEffect(() => {
    setInterval(() => {
      uppy.retryAll();
    }, 5000);
  }, []);

  const onClick = () => {};
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
        Upload some music
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
