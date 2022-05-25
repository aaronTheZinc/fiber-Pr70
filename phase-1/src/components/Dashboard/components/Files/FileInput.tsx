import React, { useState } from "react";
import { AiOutlineEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import clsx from "clsx";
import { useAppDispatch } from "../../../../redux/store/store";
import { FilesDataType } from "./FilesData";
import {
  mobileShowPreview,
  showPreview,
} from "../../../../redux/actions/actions";

const FileInput: React.FC<{ item: FilesDataType; type: string }> = ({
  item,
  type,
}) => {
  const [editable, setEditable] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex justify-between item pl-2 2xl:pl-3 space-x-6">
      <div
        className={clsx(
          "w-3/5 border relative rounded-md",
          editable ? "border-white" : "border-white/40"
        )}
      >
        <label className="text-white/80 text-[7px] absolute -top-[5px] left-1.5 bg-vreel_blue_dark px-2">
          <span>Filename</span>
        </label>
        <input
          disabled={!editable}
          defaultValue={item.name}
          type="text"
          className={clsx(
            "bg-transparent w-full h-full rounded-md border-none outline-none focus:outline-none",
            editable ? "text-white" : "text-gray-500"
          )}
        />
      </div>
      <div className="w-2/5 flex justify-end space-x-4 sm:space-x-10 md:space-x-4 lg:space-x-10 xl:space-x-4 items-center pr-2 sm:pr-1">
        <button className="text-secondary">
          <span className="lg:block hidden">Delete</span>
          <span className="block lg:hidden w-6 h-6">
            <img
              src="/assets/delete-bin-2-line.svg"
              alt="Icons delete"
              className="w-full h-full"
            />
          </span>
        </button>
        <button className="text-secondary" onClick={() => setEditable(true)}>
          <span className="lg:block hidden">Rename</span>
          <span className="block lg:hidden w-6 h-6">
            <img
              src="/assets/ball-pen-line.svg"
              alt="Icons rename"
              className="w-full h-full"
            />
          </span>
        </button>
        <button
          onClick={() => {
            dispatch(showPreview({ type: type, payload: item.url }));
            dispatch(mobileShowPreview());
          }}
        >
          {type === "audio" ? (
            <BsHeadphones className="text-secondary text-xl sm:text-2xl xl:text-base" />
          ) : (
            <AiOutlineEye className="text-secondary text-xl sm:text-2xl xl:text-base" />
          )}
        </button>
      </div>
    </div>
  );
};

export default FileInput;
