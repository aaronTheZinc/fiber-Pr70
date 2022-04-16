import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import { DashboardModal } from "@uppy/react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import Dropbox from "@uppy/dropbox";
import Instagram from "@uppy/instagram";
import Url from "@uppy/url";
import Audio from "@uppy/audio";
import ScreenCapture from "@uppy/screen-capture";
import Compress from "@uppy/compressor";
// import Webcam from "@uppy/webcam";
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

export const UppyModal = (): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const uppy = new Uppy({
    id: "uppy",
    autoProceed: true,
    allowMultipleUploadBatches: true,
    debug: false,
  })
  uppy.use(Tus, {
    endpoint: "http://localhost:7070/files/",
    headers: {
      token: cookies.userAuthToken ? cookies.userAuthToken : null,
    },
  })
  // uppy.use(ScreenCapture)
  // uppy.use(Dropbox, { companionUrl: 'http://localhost:3020' })
  // uppy.use(Instagram,  { companionUrl: 'http://localhost:3020' });
  // uppy.use(Url,  { companionUrl: 'http://localhost:3020' });

  uppy.on("file-added", (file) => {
    console.log("this is the file:", file);

    uppy.setFileMeta(file.id, {
      test: "hello",
    });

  });

  uppy.on('progress', (progress) => {
    // progress: integer (total progress percentage)
    console.log(progress)
  })
  uppy.on("complete", (result) => {
    console.log("response ->", result);
    result.successful.forEach((item) => {
        console.log(item.uploadURL)
    })
    // console.log('Upload complete! We’ve uploaded these files:', result.successful)
  });

  const { username } = router.query;

  const capitilizedUsername = username
    ? username[0].toUpperCase() + username.slice(1)
    : null;

  useEffect(() => {
    setInterval(() => {
      uppy.retryAll()
    }, 5000)

  }, []);

  const onClick = () => { };
  const handleClose = () => {
    setOpen(!open)
  };
  return (
    <div>
      <button type="button" style={{ width: "100%" }} className="vreel-edit-menu__button blue" onClick={() => setOpen(!open)}>
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
