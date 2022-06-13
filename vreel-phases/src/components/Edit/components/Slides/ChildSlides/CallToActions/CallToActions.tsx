import clsx from "clsx";
import React, { useState } from "react";
import { callToActionsData, SlidesDataType } from "../../SlidesData";
import SlideInput from "../../../../../formik/common/SlideInput/SlideInput";
import Styles from "./CallToActions.module.scss";

const CallToActions = () => {
  const [active, setActive] = useState(0);
  console.log(active);

  return (
    <div className={Styles.callToActionsContainer}>
      <SlideInput type="text" placeholder="Link Header" name="link_header" />
      <p>Link Type</p>
      <div>
        {callToActionsData.map((item: SlidesDataType, index: number) => (
          <div
            key={index}
            className={clsx(active === index ? Styles.active : Styles.deactive)}
            onClick={() => setActive(index)}
          >
            <img src={item.src} alt="Call element Icon" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      <p>Link</p>
      {active === 4 || active === 5 ? (
        <select>
          <option value={1}>1</option>
        </select>
      ) : (
        <SlideInput type="text" placeholder="Phone Number" name="phone" />
      )}
    </div>
  );
};

export default CallToActions;
