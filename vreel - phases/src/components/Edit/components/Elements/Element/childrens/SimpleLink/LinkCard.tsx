import clsx from 'clsx';
import { useState } from 'react';
import ChildInput from 'src/components/Shared/Inputs/ChildInput';
import Styles from './LinkCard.module.scss';

const LinkCard: React.FC = () => {
  const options = [
    {
      title: 'URL',
      logo: '/assets/calltoaction/global-line.svg',
    },
    {
      title: 'Slide',
      logo: '/assets/calltoaction/slide.svg',
    },
    {
      title: 'Element',
      logo: '/assets/calltoaction/stack-line.svg',
    },
  ];

  const [activeButton, setActiveButton] = useState<number>(0);

  return (
    <div className={Styles.link_card}>
      <div className={Styles.link_card_left}>
        <img src='/assets/images/female.png' alt='Picture of a Lady' />
        <ChildInput type='text' placeholder='Tag' />
      </div>

      <div className={Styles.link_card_right}>
        <ChildInput type='text' placeholder='Link Header' />
        <div className={Styles.options}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setActiveButton(index)}
              className={clsx(
                Styles.button,
                activeButton === index && Styles.button_active
              )}
            >
              <img src={option.logo} alt={option.title} />
              <span>{option.title}</span>
            </button>
          ))}
        </div>
        <ChildInput type='text' placeholder='URL' />
      </div>
    </div>
  );
};

export default LinkCard;
