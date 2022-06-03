import React, { useRef, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import clsx from "clsx";
import { useAppDispatch } from "../../../../../redux/store/store";
import { FilesDataType } from "../FilesData";
import Styles from "./FileInput.module.scss";
import {
  showMobilePreview,
  showPreviewActions,
} from "src/redux/createSlice/createMenuSlice";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { ToastModal } from "src/components/common/ToastModal/ToastModal";
const EIDT_SCHEMA = gql`
  mutation renameFile($token: String!, $newName: String!, $fileId: String!) {
    editFileName(token: $token, newName: $newName, fileId: $fileId) {
      succeeded
      message
    }
  }
`;
const DELETE_SCHEMA = gql`
  mutation deleteFile($token: String!, $fileId: String!) {
    deleteFile(token: $token, fileId: $fileId) {
      succeeded
      message
    }
  }
`;
const FileInput: React.FC<{
  item: FilesDataType;
  type: string;
  refetch: Function;
}> = ({ item, type, refetch }) => {
  const [editable, setEditable] = useState(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const [renameItem, { data: data1, loading: loading1, error: error1 }] =
    useMutation(EIDT_SCHEMA);
  const [deleteItem, { data, loading, error }] = useMutation(DELETE_SCHEMA);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  console.log(isDelete);

  return (
    <div className={Styles.fileInputContainer}>
      <div
        className={clsx(
          Styles.inputContainer,
          editable ? Styles.inputActive : Styles.inputDeactive
        )}
      >
        <label>Filename</label>
        <input
          ref={inputRef}
          disabled={!editable}
          defaultValue={item.name}
          type="text"
        />
      </div>
      <div className={Styles.fileBtnContainer}>
        <button
          className={Styles.iconButtons}
          onClick={() => {
            toast.dismiss();
            toast((tost) => (
              <ToastModal
                id={item.id}
                tost={tost}
                DELETE_SCHEMA={DELETE_SCHEMA}
                type={type}
                refetch={refetch}
              />

              /*    <div style={{ height: "90px", width: "220px" }}>
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "12px",
                    fontSize: "17px",
                  }}
                >
                  Are you sure you want to delete it ?
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <button
                    style={{
                      background: "red",
                      padding: "7px 20px",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      setIsDelete(true);
                      toast.dismiss(t.id);
                      deleteItem({
                        variables: {
                          token: cookies["userAuthToken"],
                          fileId: item.id,
                        },
                      }).then((res: any) => {
                        if (res?.data?.deleteFile.succeeded) {
                          refetch();
                          toast.success(`${type} delete successfully`);
                        }
                      });
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setIsDelete(false);
                      toast.dismiss(t.id);
                    }}
                    style={{
                      background: "Green",
                      padding: "7px 20px",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    No
                  </button>
                </div>
              </div> */
            ));
          }}
        >
          <span className={Styles.delText}>Delete</span>
          <span className={Styles.icon}>
            <img src="/assets/delete-bin-2-line.svg" alt="Icons delete" />
          </span>
        </button>
        <button
          className={Styles.iconButtons}
          onClick={() => {
            setEditable(true);
            if (editable) {
              renameItem({
                variables: {
                  token: cookies["userAuthToken"],
                  newName: inputRef?.current?.value,
                  fileId: item.id,
                },
              }).then((res) => {
                if (res?.data?.editFileName.succeeded) {
                  refetch();
                  toast.success(`${type} File Rename Successfully`);
                }
              });
              setEditable(false);
            }
          }}
        >
          <span className={Styles.delText}>Rename</span>
          <span className={Styles.icon}>
            <img src="/assets/ball-pen-line.svg" alt="Icons rename" />
          </span>
        </button>
        <button
          className={Styles.iconButtons}
          onClick={() => {
            console.log(item.url);
            dispatch(showPreviewActions({ type: type, payload: item.url }));
            dispatch(showMobilePreview(true));
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
