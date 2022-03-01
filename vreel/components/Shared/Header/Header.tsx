import React from "react";

const Header = (): JSX.Element => {
  return (
    <>
      <header className="vreel-header vreel-header__wrapper">
        <img src="/logo.svg" alt="vreel logo" className="vreel-header__logo" />
        <img
          onClick={(e) => {
            const el = document.querySelector(
              ".vreel-menu.vreel-menu__wrapper"
            );
            el.style.display = "flex";  
          }}
          src="/menu-bars.svg"
          alt="vreel menu"
        />
      </header>
    </>
  );
};

export default Header;
