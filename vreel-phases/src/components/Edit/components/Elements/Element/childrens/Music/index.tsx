import ChildInput from 'src/components/Shared/Inputs/ChildInput';
import Styles from '../Children.module.scss';
import { musics } from './musicData';

const MusicLinks: React.FC = () => {
  return (
    <div className={Styles.children}>
      <ChildInput placeholder='Element Header' type='text' />

      <div>
        {musics.map((music, index) => (
          <div key={index} className={Styles.iconWrapper}>
            <img src={music.logo} alt={music.title} />
            <input type='text' placeholder='Link' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicLinks;
