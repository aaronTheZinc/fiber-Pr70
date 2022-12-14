import React, { useState } from "react";
import { BiUpload } from "react-icons/bi";
import UppyModal from "@shared/UppyModal/UppyModal";
import Styles from "./UploadBtn.module.scss";

const UploadBtn = () => {
  const [open, setOpen] = useState(false);
  function modalOpen() {
    setOpen(!open);
  }
  return (
    <>
      <div onClick={modalOpen} className={Styles.uploadBtn}>
        <button type="button">
          <span>Upload Your Files</span>
          <BiUpload className={Styles.icon} />
        </button>
      </div>
      {/* <UppyModal open={open} setOpen={setOpen} /> */}
    </>
  );
};

export default UploadBtn;
