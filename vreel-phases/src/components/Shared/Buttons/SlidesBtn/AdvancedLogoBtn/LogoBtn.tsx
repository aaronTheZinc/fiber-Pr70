import React from "react";
import { useSelector } from "react-redux";
import FormikControl from "@formik/FormikControl";
import {
  isDesktopShow,
  showAdvancedLogo,
  showMediaMobileSelector,
} from "@redux/createSlice/createMobileMediaSelector";

import { RootState, useAppDispatch } from "@redux/store/store";
import Styles from "./LogoBtn.module.scss";

type Props = {};

const LogoBtn = (props: Props) => {
  const { getMediaIconsLink } = useSelector(
    (state: RootState) => state.mobileMediaSelector
  );
  const dispatch = useAppDispatch();
  return (
    <div className={Styles.BtnContainer}>
      <div className={Styles.BtnContainer__imgContainer}>
        {false ? (
          <FormikControl
            control="image"
            name="advanced.logoUrl"
            placeholder="Submit"
            type="image"
          />
        ) : (
          <img src="/assets/images/female.png" alt="Logo Images" />
        )}
      </div>
      <button
        type="button"
        className={Styles.BtnContainer__addLogo}
        onClick={() => {
          dispatch(showMediaMobileSelector());
          dispatch(showAdvancedLogo(true));
          dispatch(isDesktopShow(false));
        }}
      >
        <span>Add Logo</span>
        <img
          className={Styles.img}
          src="/assets/icons/addLogo.svg"
          alt="Add Logo Images"
        />
      </button>
    </div>
  );
};

export default LogoBtn;
