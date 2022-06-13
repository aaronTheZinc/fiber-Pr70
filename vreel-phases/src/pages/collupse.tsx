import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Collapse from "src/components/Edit/components/Slides/Collapse/Collapse";
import AccountMenu from "src/components/Shared/Menu/AccountMenu/AccountMenu";
import GeneralMenu from "src/components/Shared/Menu/GeneralMenu/GeneralMenu";
import { RootState, useAppDispatch } from "src/redux/store/store";

export default function collupse() {
  // console.log(topHeight, middleHeight, bottomHeight);
  const [heights, setHeights] = useState([]);
  return (
    <>
      {/* <Slides /> */}
      {/* <EditFiles /> */}
      {/* <GeneralMenu /> */}
      {/* <AccountMenu /> */}
      {/* <Collapse title={`Slides_${e}`} level={1}></Collapse> */}
      {[1, 2, 3, 4, 5, 6, 7, 7, 8, 5].map((e) => (
        <Collapse title={`Slides_${e}`} level={1}>
          {[1, 2, 5, 7, 8, 8, 8, 8].map((e2) => (
            <Collapse
              title={`Slides_${e}.${e2}`}
              level_1={`Slides_${e}`}
              level={2}
            >
              {[1, 2].map((e3) => (
                <Collapse
                  title={`Slides_${e}.${e2}.${e3}`}
                  level_1={`Slides_${e}`}
                  level_2={`Slides_${e}.${e2}`}
                  level={2}
                ></Collapse>
              ))}
            </Collapse>
          ))}
        </Collapse>
      ))}
    </>
  );
}
