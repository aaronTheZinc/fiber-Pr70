import { useRouter } from 'next/router';
import { useState } from 'react';

const ToggleButton: React.FC = () => {
  const [buttonState, setButtonState] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => {
          setButtonState(!buttonState);
          router.push('/');
        }}
        className='bg-secondary rounded-[40px] border-2 border-white p-[2px] flex justify-between'
      >
        <button
          className={`w-full font-medium rounded-[40px] py-1 px-4 text-white ${
            buttonState && 'bg-white text-secondary'
          }`}
        >
          View
        </button>
        <button
          className={`w-full font-medium rounded-[40px] py-1 px-4 text-white ${
            !buttonState && 'bg-white text-secondary'
          }`}
        >
          Edit
        </button>
      </div>
      <p className='text-white font-medium text-sm mt-2'>
        Toggle To View VReel
      </p>
    </div>
  );
};

export default ToggleButton;
