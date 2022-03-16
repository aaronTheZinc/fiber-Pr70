import { useRouter } from "next/router";
import React from "react";

const Header = (): JSX.Element => {
  const router = useRouter();
  console.log("router", router);
  const styles =
    router.pathname.includes("login") || router.pathname.includes("register") || router.pathname.includes("forgot-password")
      ? {
          display: "none",
        }
      : {};
  return (
    <>
      <header style={styles} className="vreel-header vreel-header__wrapper">
        <img
          onClick={() => router.push("/")}
          src="/logo.svg"
          alt="vreel logo"
          className="vreel-header__logo"
        />
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
