import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";

const MenuCollapse: React.FC<{ actions: Function }> = ({ actions }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="absolute right-5 top-5 cursor-pointer"
      onClick={() => dispatch(actions())}
    >
      <IoIosCloseCircleOutline className="text-white text-3xl md:text-5xl duration-300 hover:text-secondary" />
    </div>
  );
};

export default MenuCollapse;
