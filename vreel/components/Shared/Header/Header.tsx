import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { FaSignInAlt } from "react-icons/fa";

const Header = (): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);

  const router = useRouter();
  // console.log("router", router);
  const { username } = router.query;
  const styles =
    router.pathname.includes("login") ||
    router.pathname.includes("register") ||
    router.pathname.includes("forgot-password")
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
        <div className="vreel-header__nav-items__wrapper">
            <div
              onClick={(e) => router.push('/login')}
              data-initials={
               "M"
              }
              className="rounded-circle"
            >
            </div>
          <img
            onClick={(e) => {
              const menuWrapperEl = document.querySelector(
                ".vreel-menu.vreel-menu__wrapper"
              );
              menuWrapperEl.style.display = "flex";
            }}
            src="/menu-bars.svg"
            alt="vreel menu"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
