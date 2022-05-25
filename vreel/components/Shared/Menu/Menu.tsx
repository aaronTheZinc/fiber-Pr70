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
    console.log("el", menuEl.current.children[1].children);
  };

  return (
    <div ref={menuEl} className="vreel-menu vreel-menu__wrapper">
      <img
        onClick={onButtonClick}
        src="/close-icon.svg"
        alt="vreel menu close icon"
        className="vreel-menu__close-btn"
      />
      <ul className="vreel-menu-items__wrapper">
        {username || true ? (
          <>
            {cookies.userAuthToken || true ? (
              <>
                <li>
                  <a href="#">My VReel</a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      const editMenuEl = document.querySelector(
                        ".vreel-edit-menu.vreel-edit-menu__wrapper"
                      );
                      editMenuEl.style.display = "flex";
                      return;
                    }}
                  >
                    Edit VReel
                  </a>
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
              </>
            ) : (
              <>
                <li>
                  <a href="#">Links</a>
                </li>
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
            )}
          </>
        ) : (
          <>
            <li>
              <a href="#">Links</a>
            </li>
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
        )}
      </ul>
    </div>
  );
};

export default Menu;
