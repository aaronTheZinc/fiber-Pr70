import React from "react";

const Menu = (): JSX.Element => {
  return (
    <div className="vreel-menu vreel-menu__wrapper">
      <img
        onClick={(e) => {
          const el = document.querySelector(".vreel-menu.vreel-menu__wrapper");
          el.style.display = "none";
        }}
        src="/close-icon.svg"
        alt="vreel menu close icon"
        className="vreel-menu__close-btn"
      />
      <ul className="vreel-menu__wrapper">
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
        <li>
          <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
