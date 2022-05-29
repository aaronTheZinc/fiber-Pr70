import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import clsx from "clsx";
import { useAppDispatch } from "../../../../../redux/store/store";
import { FilesDataType } from "../FilesData";
import {
  mobileShowPreview,
  showPreview,
} from "../../../../../redux/actions/actions";
import Styles from "./FileInput.module.scss";

const FileInput: React.FC<{ item: FilesDataType; type: string }> = ({
  item,
  type,
}) => {
  const [editable, setEditable] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className={Styles.fileInputContainer}>
      <div
        className={clsx(
          Styles.inputContainer,
          editable ? Styles.inputActive : Styles.inputDeactive
        )}
      >
        <label>Filename</label>
        <input disabled={!editable} defaultValue={item.name} type="text" />
      </div>
      <div className={Styles.fileBtnContainer}>
        <button className={Styles.iconButtons}>
          <span className={Styles.delText}>Delete</span>
          <span className={Styles.icon}>
            <img src="/assets/delete-bin-2-line.svg" alt="Icons delete" />
          </span>
        </button>
        <button
          className={Styles.iconButtons}
          onClick={() => setEditable(true)}
        >
          <span className={Styles.delText}>Rename</span>
          <span className={Styles.icon}>
            <img src="/assets/ball-pen-line.svg" alt="Icons rename" />
          </span>
        </button>
        <button
          className={Styles.iconButtons}
          onClick={() => {
            dispatch(showPreview({ type: type, payload: item.url }));
            dispatch(mobileShowPreview());
          }}
        >
          {type === "audio" ? (
            <BsHeadphones className={Styles.viewIcon} />
          ) : (
            <AiOutlineEye className={Styles.viewIcon} />
          )}
        </button>
      </div>
    </div>
  );
};

export default FileInput;
