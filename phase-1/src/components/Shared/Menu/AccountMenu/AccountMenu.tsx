import React from "react";
import { AccMenus, NavItemTypes } from "../MenuItems";
import { useSelector } from "react-redux";
import MenuItem from "../MenuItem/MenuItem";
import MenuCloseBtn from "../../Buttons/MenuCloseBtn/MenuCloseBtn";
import { AccMenuAction } from "../../../../redux/actions/actions";
import Link from "next/link";
import { RootState } from "../../../../redux/store/store";
import Styles from "./AccountMenu.module.scss";
import clsx from "clsx";

const AccountMenu = () => {
  const { accMenu } = useSelector((state: RootState) => state.expandAccMenu);
  return (
    <div
      className={clsx(
        Styles.generalMenu,
        accMenu ? Styles.active : Styles.deactive
      )}
    >
      <div className={Styles.container}>
        <MenuCloseBtn action={AccMenuAction} />
        <div className={Styles.logoContainer}>
          <div className={Styles.logo}>
            <button className={Styles.logOutBtn}>Log Out</button>
          </div>
        </div>
        <div className={Styles.menuAccContainer}>
          {AccMenus.map((item: NavItemTypes, index: number) => (
            <MenuItem
              key={index}
              item={item}
              isRightRound={false}
              action={AccMenuAction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
