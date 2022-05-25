import React from "react";
import { AccMenus, NavItemTypes } from "./MenuItems";
import { useSelector } from "react-redux";
import MenuTitle from "./MenuTitle";
import MenuCollapse from "./MenuCollapse";
import { AccMenuAction } from "../../redux/actions/actions";
import Link from "next/link";
import { RootState } from "../../redux/store/store";

const AccMenu = () => {
  const { accMenu } = useSelector((state: RootState) => state.expandAccMenu);
  return (
    <div
      className={`fixed top-0 left-0 z-50 bg-primary/90 w-screen min-h-screen transition-all duration-500 ${
        accMenu ? "translate-x-0" : "translate-x-full"
      } `}
    >
      <div className="container w-full h-full">
        <MenuCollapse actions={AccMenuAction} />
        <div className="absolute bottom-5 right-5 md:left-5">
          <Link href={""}>
            <p className="text-4xl 2xl:text-5xl font-bold text-white">
              Log Out
            </p>
          </Link>
        </div>
        <div className=" space-y-6 2xl:space-y-12 min-h-screen flex flex-col items-start pt-20">
          {AccMenus.map((item: NavItemTypes, index: number) => (
            <MenuTitle
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

export default AccMenu;
