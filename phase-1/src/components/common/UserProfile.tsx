import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccMenuAction } from '../../redux/actions/actions';

const UserProfile: React.FC<{ className?: string }> = ({ className }) => {
  const [notification, setNotification] = useState<number>(50);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(AccMenuAction())}
      className={`${className}`}
    >
      <div className='relative'>
        <img
          className='w-9'
          src='/assets/vreel-profile.png'
          alt='Profile-Icon'
        />
        <span className='text-xs font-semibold absolute top-1 right-1 bg-secondary h-6 w-max px-2 rounded-full flex items-center justify-center translate-x-1/2 -translate-y-1/2'>
          {notification > 990 ? '999+' : notification}
        </span>
      </div>
    </button>
  );
};

export default UserProfile;
