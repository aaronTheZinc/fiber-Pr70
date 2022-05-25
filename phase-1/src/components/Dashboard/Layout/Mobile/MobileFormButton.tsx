import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { components } from "../../data";

const MobileFormButton: React.FC<{ obj: { title: string; href: string } }> = ({
  obj,
}) => {
  const [height, setHeight] = useState<number>(0);
  const wrapperRef = useRef(null);

  const handleSetHeight = () => {
    if (height === 0) {
      setHeight(wrapperRef.current.offsetHeight);
    } else {
      setHeight(0);
    }
  };

  const pathName = obj.href.split("/").reverse()[0];
  const element = components.find((obj) => obj.title === pathName);

  if (!element?.component) {
    return (
      <div className="rounded-2xl  bg-vreel_blue_dark">
        <button
          onClick={handleSetHeight}
          className={` text-white text-base font-medium w-full py-3 px-4  flex items-center justify-between  active:scale-100  `}
        >
          <span>{obj.title}</span>
          <span className="">
            {height === 0 ? (
              <img className="w-8" src="/assets/collapse-plus.png" alt="" />
            ) : (
              <img className="w-8" src="/assets/collapse-minus.png" alt="" />
            )}
          </span>
        </button>

        <div
          style={{ height: `${height}px` }}
          className=" w-full overflow-hidden transition-all duration-500 ease-in-out "
        >
          <p ref={wrapperRef} className="p-[1rem] lg:p-[2rem] text-white">
            No Component
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl  bg-vreel_blue_dark">
      <button
        onClick={handleSetHeight}
        className={` text-white text-base font-medium w-full py-3 px-4  flex items-center justify-between  active:scale-100  `}
      >
        <span>{obj.title}</span>
        <span className="">
          {height === 0 ? (
            <img className="w-8" src="/assets/collapse-plus.png" alt="" />
          ) : (
            <img className="w-8" src="/assets/collapse-minus.png" alt="" />
          )}
        </span>
      </button>

      <div
        style={{ height: `${height}px` }}
        className=" w-full overflow-hidden transition-all duration-700 ease-in "
      >
        <div ref={wrapperRef} className="">
          <element.component />
        </div>
      </div>
    </div>
  );
};

export default MobileFormButton;
