import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { FaSignInAlt } from "react-icons/fa";

const Header = (): JSX.Element => {
  const [cookies, _, removeCookies] = useCookies(["userAuthToken"]);

  const router = useRouter();
  // console.log("router", router);
  const { username } = router.query;

  const showConfirm = () => {
    if (
      !confirm(
        `Are you sure you want to log out ${username[0] + username.slice(1)}? `
      )
    )
      return;
    removeCookies("userAuthToken");
    router.push("/");
  };

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
        <div style={{ padding: "1pc" }}>
          <img
            onClick={() => router.push("/")}
            src="/logo.svg"
            alt="vreel logo"
            style={{ padding: "0pc" }}
            className="vreel-header__logo"
          />
        </div>
        {username && cookies.userAuthToken ? (
          <div
            onClick={showConfirm}
            data-initials={username[0].toUpperCase()}
            className="rounded-circle"
          ></div>
        ) : (
          <></>
        )}
        {/* <div className="vreel-header__nav-items__wrapper">
          {username ? (
            cookies.userAuthToken ? (
              <div
                onClick={showConfirm}
                data-initials={username[0].toUpperCase()}
                className="rounded-circle"
              ></div>
            ) : (
              <div
                onClick={(e) => router.push("/login")}
                className="rounded-circle"
              >
                <FaSignInAlt color="white" />
              </div>
            )
          ) : (
            ""
          )} */}
        {/* <div
              onClick={(e) => router.push('/login')}
              data-initials={
               "M"
              }
              className="rounded-circle"
            >
            </div> */}
        {/* <img
            onClick={(e) => {
              const menuWrapperEl = document.querySelector(
                ".vreel-menu.vreel-menu__wrapper"
              );
              (menuWrapperEl as any).style.display = "flex";
            }}
            src="/menu-bars.svg"
            alt="vreel menu"
            style={{ width: "35px", marginTop: "2pc" }}
          /> */}
        {/* </div>  */}
      </header>
    </>
  );
};

export default Header;
