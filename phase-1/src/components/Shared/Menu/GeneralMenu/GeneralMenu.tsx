import React from "react";
import { NavItem, NavItemTypes } from "../MenuItems";

import { NavMenuAction } from "../../../../redux/actions/actions";
import { useSelector } from "react-redux";
import MenuItem from "../MenuItem/MenuItem";
import MenuCloseBtn from "../../Buttons/MenuCloseBtn/MenuCloseBtn";
import { useRouter } from "next/router";
import { RootState } from "../../../../redux/store/store";
import clsx from "clsx";
import Styles from "./GeneralMenu.module.scss";

const GeneralMenu = () => {
  const router = useRouter();
  const { navMenu } = useSelector((state: RootState) => state.expandNav);

  return (
    <div
      className={clsx(
        Styles.generalMenu,
        navMenu ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.container}>
        <MenuCloseBtn action={NavMenuAction} />
        <div className={Styles.logoContainer}>
          <div className={Styles.logo}>
            <p>Powered By</p>
            <div>
              <img src="/assets/images/vreel-logo.png" />
            </div>
          </div>
        </div>
        <div className={Styles.menuContainer}>
          {NavItem.map((item: NavItemTypes, index: number) => (
            <MenuItem
              key={index}
              item={item}
              isRightRound={true}
              action={NavMenuAction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default GeneralMenu;
