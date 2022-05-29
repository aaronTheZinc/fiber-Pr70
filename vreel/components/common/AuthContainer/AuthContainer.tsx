import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
const AuthContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  return (
    <div className="container">
      <div onClick={() => router.push("/")}>
        <BsArrowLeftCircle />
        <p>Back</p>
      </div>
      <div>
        <img src="/assets/images/regLogBg.png" alt="" />
      </div>

      <div>
        <div onClick={() => router.push("/")}>
          <IoIosCloseCircleOutline />
        </div>

        <div>
          <img src="/assets/images/vreel-logo.png" alt="Vreel Logo" />
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
