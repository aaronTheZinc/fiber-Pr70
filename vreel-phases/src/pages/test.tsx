import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import AccSettings from "src/components/Edit/components/AccountSettings/AccSettings/AccSettings";
import PersonalInfo from "src/components/Edit/components/AccountSettings/PersonalInfo/PersonalInfo";
import Slides from "src/components/Edit/components/Slides/Slides/Slides";
import AccountMenu from "src/components/Shared/Menu/AccountMenu/AccountMenu";
import GeneralMenu from "src/components/Shared/Menu/GeneralMenu/GeneralMenu";
import { RootState, useAppDispatch } from "src/redux/store/store";

export default function test() {
  return (
    <>
      <AccSettings />
      {/* <PersonalInfo /> */}
      {/* <EditFiles /> */}
      {/* <GeneralMenu /> */}
      {/* <AccountMenu /> */}

      {/* {[1].map((item, index) => (
        <Collapse title={`Slides_1`} key={index} height={topHeight}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Collapse
              title={`Slides_${index}`}
              index={index}
              key={index}
              height={middleHeight[index]}
            >
              <p style={{ color: "black", border: "1px solid red" }}>Hello</p>
            </Collapse>
          ))}
        </Collapse>
      ))} */}
    </>
  );
}
