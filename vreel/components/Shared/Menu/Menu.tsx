import { useRouter } from "next/router";
import React, { useRef } from "react";

import { useCookies } from "react-cookie";

const Menu = (): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);

  const router = useRouter();
  const { username } = router.query;

  // console.log("cookies:", cookies.userAuthToken);

  const menuEl = useRef(null);
  const onButtonClick = () => {
    menuEl.current.style.display = "none";
  };
  return (
    <div ref={menuEl} className="vreel-menu vreel-menu__wrapper">
      <img
        onClick={onButtonClick}
        src="/close-icon.svg"
        alt="vreel menu close icon"
        className="vreel-menu__close-btn"
      />
      <ul className="vreel-menu__wrapper">
        {cookies.userAuthToken ? (
          <>
            <li>
              <a href="#">My VReel</a>
            </li>
            <li>
              <a href="#">Edit VReel</a>
            </li>
            <li>
              <a href="#">News Feed</a>
            </li>
            <li>
              <a href="#">Analytics</a>
            </li>
            <li>
              <a href="#">Display Mode</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li onClick={() => removeCookies("userAuthToken")}>
              <a href="#">Logout</a>
            </li>
          </>
        ) : username ? (
            <>
              <li>
                <a href="#">Social</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
            </>
        ) : (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/register">Register</a>
              </li>
            </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
