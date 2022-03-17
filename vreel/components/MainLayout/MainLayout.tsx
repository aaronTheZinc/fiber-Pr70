import React from "react";
import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import Menu from "../Shared/Menu/Menu";
import EditMenu from "../Edit/EditMenu/EditMenu";

type Props = {
  isMobile: boolean;
  children?: React.ReactNode;
};

const MainLayout = ({ children, isMobile }: Props): JSX.Element => {
  return (
    <div style={{ background: "#000", color: "#fff", height: "100%" }}>
      <Header />
      <Menu />
      <EditMenu />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
