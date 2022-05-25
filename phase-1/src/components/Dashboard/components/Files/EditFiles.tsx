import React, { useRef, useState } from "react";
import Desktop from "./Desktop";
import File from "./File";
import Mobile from "./Mobile";

type Props = {};

const EditFiles = (props: Props) => {
  return (
    <div>
      <Desktop />
      <Mobile />
    </div>
  );
};

export default EditFiles;
