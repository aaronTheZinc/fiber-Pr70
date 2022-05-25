import { useRouter } from 'next/router';
import { useState } from 'react';
import UserProfile from '../../../common/UserProfile';
import MobileForm from './MobileForm';
import ToggleButton from './ToggleButton';

const MobileDashboard: React.FC = () => {
  return (
    <section className=' md:hidden bg-primary min-h-screen py-6'>
      <div className='flex justify-center px-4 '>
        <div className='flex space-x-6'>
          <button className='w-max h-max  px-6 py-2 bg-vreel_green text-white font-bold rounded-[40px]'>
            Save
          </button>
          <ToggleButton />
          <UserProfile className=' h-max' />
        </div>
      </div>

      <div className='h-full'>
        <MobileForm />
      </div>
    </section>
  );
};

export default MobileDashboard;

{
  /* <div>
<div
  onClick={() => {
    setButtonState(!buttonState);
    router.push('/');
  }}
  className={`border-2 border-white rounded-[38px] w-36  overflow-hidden flex transition-all duration-200 ease-in ${
    buttonState
      ? 'justify-start bg-vreel_gray '
      : 'justify-end  bg-secondary'
  }`}
>
  <button className='text-base capitalize px-4 py-2 bg-white text-black rounded-[38px] transition-all duration-200 ease-in'>
    {buttonState ? 'View' : 'Edit'}
  </button>
</div>
<p className='text-white font-medium text-sm mt-2'>
  Toggle To View VReel
</p>
</div> */
}
