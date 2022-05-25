import React from "react";
import { NavItem, NavItemTypes } from "./MenuItems";

import { NavMenuAction } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import MenuTitle from "./MenuTitle";
import MenuCollapse from "./MenuCollapse";
import { useRouter } from "next/router";
import { RootState } from "../../redux/store/store";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { navMenu } = useSelector((state: RootState) => state.expandNav);

  return (
    <div
      className={`fixed top-0 left-0 z-50 bg-primary/90 w-screen min-h-screen transition-all duration-500 ${
        navMenu ? "translate-x-0" : "translate-x-full"
      } `}
    >
      <div className="container w-full h-full">
        <MenuCollapse actions={NavMenuAction} />
        <div className="absolute bottom-5 right-5 md:left-5">
          <div className="flex items-center">
            <p className="text-vreel_gray">Powered By</p>
            <div className="w-12 md:w-20 h-12 md:h-20">
              <img
                src="/assets/images/vreel-logo.png"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6 2xl:space-y-12 min-h-screen flex flex-col items-end pt-20 pl-5">
          {NavItem.map((item: NavItemTypes, index: number) => (
            <MenuTitle
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
export default Navbar;
