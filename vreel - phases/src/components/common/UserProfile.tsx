import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccMenuAction } from '../../redux/actions/actions';

const UserProfile: React.FC<{
  className?: string;
  section?: 'dashboard' | 'hero';
}> = ({ className, section }) => {
  const [notification, setNotification] = useState<number>(50);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(AccMenuAction())}
      className={`btn-profile ${
        section === 'dashboard' && 'btn-profile__dashboard'
      } `}
    >
      <div>
        <img src='/assets/vreel-profile.png' alt='Profile-Icon' />
        <span className={`notifications  `}>
          {notification > 990 ? '999+' : notification}
        </span>
      </div>
    </button>
  );
};

export default UserProfile;
