import { useRouter } from 'next/router';
import { useState } from 'react';
import { advanceOptions, footerOptions, regularOptions } from '../../data';

const DesktopSidebar: React.FC = () => {
  const router = useRouter();
  const pathName = router.asPath;
  const pathLength = pathName.split('/');
  pathLength.pop();
  const parentPath = pathLength.join('/');

  return (
    <div className='relative pt-6'>
      {/* BRAND LOGO */}
      <div className='w-max mx-auto pb-6'>
        <img
          className='w-12 object-cover'
          src='/assets/vreel-logo-2.png'
          alt='Brand Logo'
        />
      </div>

      <ul className=''>
        {/* REGULAR ITEMS */}
        {regularOptions.map((obj, index) => (
          <>
            <li
              onClick={() => {
                router.push(obj.href);
              }}
              className={`relative text-2xl font-semibold uppercase text-black py-3 pl-10 cursor-pointer ${
                (obj.href == parentPath && 'bg-white font-bold') ||
                (obj.href == pathName && 'bg-white font-bold')
              }`}
              key={index}
            >
              {(obj.href == pathName && (
                <span className='absolute left-3 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-secondary'></span>
              )) ||
                (obj.href == parentPath && (
                  <span className='absolute left-3 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-secondary'></span>
                ))}
              {obj.title}
            </li>

            {/* IF CHILDREN EXIST */}
            {obj.children && (
              <div className='ml-9 pt-4 overflow-hidden'>
                {obj.children.map((obj, index) => (
                  <li
                    onClick={() => {
                      // setCurrentChildIndex(index);
                      router.push(obj.href);
                    }}
                    key={index}
                    className={`relative text-xl -mt-2  py-3 cursor-pointer dashboard-nested  ${
                      obj.href == pathName
                        ? 'text-white before:border-white z-10'
                        : 'text-black'
                    }`}
                  >
                    {obj.title}
                  </li>
                ))}
              </div>
            )}
          </>
        ))}

        {/* ADVANCED ITEMS */}
        <div>
          <li className='ml-9 bg-primary text-white text-center py-2'>
            Advanced Edits
          </li>
          <div className='ml-9 pt-4 overflow-hidden'>
            {advanceOptions.map((obj, index) => (
              <li
                onClick={() => {
                  router.push(obj.href);
                }}
                key={index}
                className={`relative text-xl -mt-2  py-3 cursor-pointer dashboard-nested  ${
                  obj.href == pathName
                    ? 'text-white before:border-white z-10'
                    : 'text-black'
                }`}
              >
                {obj.title}
              </li>
            ))}
          </div>
        </div>

        {/* FOOTER OPTIONS */}
        <div>
          {footerOptions.map((obj, index) => (
            <>
              <li
                onClick={() => {
                  router.push(obj.href);
                }}
                className={`relative text-2xl font-semibold uppercase text-black py-3 pl-10 cursor-pointer ${
                  (obj.href == parentPath && 'bg-white font-bold') ||
                  (obj.href == pathName && 'bg-white font-bold')
                }`}
                key={index}
              >
                {(obj.href == pathName && (
                  <span className='absolute left-3 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-secondary'></span>
                )) ||
                  (obj.href == parentPath && (
                    <span className='absolute left-3 top-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-secondary'></span>
                  ))}
                {obj.title}
              </li>

              {/* IF CHILDREN EXIST */}
              {obj.children && (
                <div className='ml-9 pt-4 overflow-hidden'>
                  {obj.children.map((obj, index) => (
                    <li
                      onClick={() => {
                        // setCurrentChildIndex(index);
                        router.push(obj.href);
                      }}
                      key={index}
                      className={`relative text-xl -mt-2  py-3 cursor-pointer dashboard-nested  ${
                        obj.href == pathName
                          ? 'text-white before:border-white z-10'
                          : 'text-black'
                      }`}
                    >
                      {obj.title}
                    </li>
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default DesktopSidebar;

{
  /* <li className='ml-4 flex items-center justify-between text-2xl text-black font-bold my-8'>
          <img className='w-12 -ml-4' src='/assets/before-icon.png' alt='' />
          <span>Advanced</span>
          <img className='w-12 -mr-4' src='/assets/after-icon.png' alt='' />
        </li> */
}

{
  /* <div className=' space-y-2'>
          {advanceOptions.map((obj, index) => (
            <li
              onClick={() => {
                // setCurrentIndex2(index);
                // setCurrentIndex(null);
                router.push(obj.href);
              }}
              className={`text-2xl text-black py-3 pl-8 cursor-pointer ${
                obj.href == pathName && 'bg-vreel_gray font-bold'
              }`}
              key={index}
            >
              {obj.title}
            </li>
          ))}
        </div> */
}
