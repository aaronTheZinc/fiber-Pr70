import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
const AuthContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  return (
    <div className="w-full h-screen relative flex">
      <div
        className="absolute top-10 left-10 text-white cursor-pointer group"
        onClick={() => router.push("/")}
      >
        <BsArrowLeftCircle className="text-5xl group-hover:text-secondary duration-500" />
        <p className="text-xl text-white mb-0 group-hover:text-secondary duration-500">
          Back
        </p>
      </div>
      <div className="w-full h-full">
        <img
          src="/assets/images/regLogBg.png"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="h-screen overflow-y-scroll w-full md:max-w-[550px] flex-shrink-0 pt-12 bg-black z-10">
        <div
          className="text-white absolute top-5 right-5 block md:hidden"
          onClick={() => router.push("/")}
        >
          <IoIosCloseCircleOutline className="text-white text-3xl" />
        </div>

        <div className="w-full flex justify-center">
          <img
            src="/assets/images/vreel-logo.png"
            alt="Vreel Logo"
            className="h-[188px]"
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
