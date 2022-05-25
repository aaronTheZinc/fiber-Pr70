import { useRouter } from 'next/router';
import React from 'react';
import { components } from '../../data';
import DesktopSidebar from './DesktopSidebar';

const DesktopDashboard: React.FC = () => {
  const router = useRouter();
  const { item, slug } = router.query;

  const element =
    components.find((obj) => obj.title === item) ||
    components.find((obj) => obj.title === slug);

  return (
    <section className='hidden md:block bg-primary  px-8 py-6'>
      <div className=' h-max flex space-x-10 '>
        <div className='w-[250px]  h-full space-y-2 '>
          {/* <div>
            <img src='/assets/back-icon.svg' alt='' />
          </div> */}
          <div className='pb-8 relative'>
            <div className='bg-secondary rounded-3xl py-4 absolute top-0 left-4 right-0 h-full '></div>
            <DesktopSidebar />
          </div>
        </div>
        <div className='flex-1 '>
          {element?.component ? (
            <element.component />
          ) : (
            <div>
              <h1 className='text-white'>No Components</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DesktopDashboard;
