import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { NavMenuAction } from "../../redux/actions/actions";
import { NavItemTypes } from "./MenuItems";

const MenuTitle: React.FC<{
  item: NavItemTypes;
  isRightRound?: boolean;
  action: any;
}> = ({ item, isRightRound, action }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("🚀 ~ file: MenuTitle.tsx ~ line 16 ~ item.href", item.href);
  console.log(item.href);
  console.log(router.pathname);
  const isActive = item.href == router.pathname;
  return (
    <div
      onClick={() => {
        router.push(item.href);
        dispatch(action());
      }}
    >
      <div
        className={`flex items-center ${
          router.pathname === item.href ? "space-x-2" : "space-x-0"
        }`}
      >
        {!isRightRound && router.pathname === item.href && (
          <span className="w-4 h-4 rounded-full bg-secondary"></span>
        )}
        <button
          className={clsx(
            "text-5xl 2xl:text-6xl font-bold hover:text-secondary transition-all duration-500 capitalize tracking-wider",
            isActive ? "text-secondary" : "text-white"
          )}
        >
          {item.title}
        </button>
      </div>
    </div>
  );
  return (
    <button
      onClick={() => {
        router.push(item.href);
      }}
    >
      <div
        className={`flex items-center ${
          router.pathname === item.href ? "space-x-2" : "space-x-0"
        }`}
      >
        {!isRightRound && router.pathname === item.href && (
          <span className="w-4 h-4 rounded-full bg-secondary"></span>
        )}
        <button
          className={`${
            router.pathname === item.href ? "text-secondary" : "text-white"
          } text-5xl 2xl:text-6xl hover:text-secondary transition-all duration-500 capitalize tracking-wider`}
        >
          {item.title}
        </button>
        {isRightRound && router.pathname === item.href && (
          <span className="w-4 h-4 rounded-full bg-secondary"></span>
        )}
      </div>
    </button>
  );
};

export default MenuTitle;
