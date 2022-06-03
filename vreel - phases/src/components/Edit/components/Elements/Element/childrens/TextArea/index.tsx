import clsx from 'clsx';
import { useRef } from 'react';
import AddTitleButton from 'src/components/Shared/Buttons/AddTitleButton/AddTitleButton';
import ChildInput from 'src/components/Shared/Inputs/ChildInput';
import Styles from '../Children.module.scss';

const TextArea: React.FC = () => {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const options = [
    { title: 'b' },
    { title: 'i' },
    { title: 'u' },
    { title: 'To Slide' },
    { title: 'Link' },
  ];

  const handleClearText = () => {
    inputRef1.current.value = '';
    inputRef2.current.value = '';
  };

  return (
    <div className={Styles.children}>
      <ChildInput type='text' placeholder='Header' icon={true} />
      <ChildInput type='textarea' placeholder='Info' icon={true} />

      <div className={Styles.optionWrapper}>
        {options.map((option, index) => (
          <button key={index} className={Styles.option}>
            <span
              className={clsx(
                option.title === 'b'
                  ? Styles.option_bold
                  : option.title === 'i'
                  ? Styles.option_italic
                  : option.title === 'u'
                  ? Styles.option_underline
                  : ''
              )}
            >
              {option.title}
            </span>
          </button>
        ))}
      </div>
      <AddTitleButton title='Add Image' />
      <button onClick={handleClearText} className={Styles.clearArea}>
        Clear Text Area
      </button>
    </div>
  );
};

export default TextArea;
