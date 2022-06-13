import { useMutation } from "@apollo/client";
import React from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export const ToastModal = ({ DELETE_SCHEMA, tost, type, id, refetch }) => {
  const [deleteItem, { data, loading, error }] = useMutation(DELETE_SCHEMA);
  const [cookies] = useCookies(["userAuthToken"]);

  return (
    <div style={{ height: "90px", width: "220px" }}>
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
            toast.dismiss(tost.id);
            deleteItem({
              variables: {
                token: cookies["userAuthToken"],
                fileId: id,
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
            toast.dismiss(tost.id);
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
    </div>
  );
};
