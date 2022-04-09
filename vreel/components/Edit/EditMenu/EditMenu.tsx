import { useRouter } from "next/router";
import React, { useRef } from "react";

import { useCookies } from "react-cookie";
import EditSlides from "../EditSlides/EditSlides";

const EditMenu = (): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);

  const router = useRouter();
  const { username } = router.query;

  // console.log("cookies:", cookies.userAuthToken);

  const menuEl = useRef(null);
  const onButtonClick = () => {
    menuEl.current.style.display = "none";
    console.log('el', menuEl.current.children[1].children)
  };
  return (
    <div ref={menuEl} className="vreel-edit-menu vreel-edit-menu__wrapper">
      <img
        onClick={onButtonClick}
        src="/close-icon.svg"
        alt="vreel menu close icon"
        className="vreel-edit-menu__close-btn"
      />
      <ul className="vreel-edit-menu__items-wrapper">
        <EditSlides />
      </ul>
    </div>
  );
};

export default EditMenu;
