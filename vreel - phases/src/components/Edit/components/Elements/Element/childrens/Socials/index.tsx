import ChildInput from 'src/components/Shared/Inputs/ChildInput';
import Styles from '../Children.module.scss';
import { socials } from './socialsData';

const Socials: React.FC = () => {
  return (
    <div className={Styles.children}>
      <ChildInput type='text' placeholder='Element Header' />

      <div>
        {socials.map((social, index) => (
          <div key={index} className={Styles.iconWrapper}>
            <img src={social.logo} alt={`${social.title} Icon`} />
            <input type='text' placeholder='Username' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Socials;
