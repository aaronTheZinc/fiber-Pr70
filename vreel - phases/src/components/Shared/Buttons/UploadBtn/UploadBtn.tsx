import React from "react";
import Styles from "./UploadBtn.module.scss";
import { BiUpload } from "react-icons/bi";

const UploadBtn = () => {
  return (
    <div className={Styles.uploadBtn}>
      <button>
        <span>Upload Your Files</span>
        <BiUpload className={Styles.icon} />
      </button>
    </div>
  );
};

export default UploadBtn;
