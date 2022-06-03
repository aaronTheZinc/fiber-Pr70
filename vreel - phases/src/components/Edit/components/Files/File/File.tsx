import React, { SyntheticEvent } from "react";
import FileInput from "../FileInput/FileInput";
import Styles from "./File.module.scss";

const File = ({ userFiles }: any) => {
  const { loading, error, data, refetch } = userFiles || {};

  if (loading || error || !data) return <div>Loading...</div>;
  console.log(data);
  const images = data?.getUserByToken?.files.files
    .filter((e) => e.file_type.split("/")[0] == "image")
    .map((e) => {
      return {
        id: e.id,
        name: e.file_name,
        url: `${e.uri}${e.id}`,
      };
    });
  const videos = data?.getUserByToken?.files.files
    .filter((e) => e.file_type.split("/")[0] == "video")
    .map((e) => {
      return {
        id: e.id,
        name: e.file_name,
        url: `${e.uri}${e.id}`,
      };
    });
  const audios = data?.getUserByToken?.files.files
    .filter((e) => e.file_type.split("/")[0] == "audio")
    .map((e) => {
      return {
        id: e.id,
        name: e.file_name,
        url: `${e.uri}${e.id}`,
      };
    });
  console.log({ images, videos, audios });

  return (
    <div className={Styles.gridContainer}>
      {[
        { type: "image", items: images },
        { type: "video", items: videos },
        { type: "audio", items: audios },
      ].map((obj, index) => (
        <div className={Styles.gridItem} key={index}>
          <div className={Styles.type}>
            <p className={Styles.advance}>{obj.type}</p>
          </div>
          <div className={Styles.inputContainers}>
            {obj.items.map((item, index: number) => (
              <FileInput
                refetch={refetch}
                key={index}
                item={item}
                type={obj.type}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default File;
