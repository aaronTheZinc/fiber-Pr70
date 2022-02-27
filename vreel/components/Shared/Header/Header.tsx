import React from "react";

const Header = (): JSX.Element => {
  return (
    <>
      <header className="vreel-header vreel-header__wrapper">
        <img src="/logo.svg" alt="vreel logo" className="vreel-header__logo" />

        <img
          src="/menu-bars.svg"
          alt="vreel menu"
          className="vreel-header__menu"
        />
      </header>
    </>
  );
};

export default Header;
