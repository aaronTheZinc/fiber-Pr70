import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import * as AiIcons from 'react-icons/ai';
import Styles from '../DisplayOptions.module.scss';
import {
  removeFromParent,
  setParent,
} from 'src/redux/createSlice/createHeightSlice';
import { displayData } from './displayData';
import ChildInput from 'src/components/Shared/Inputs/ChildInput';
import AddTitleButton from 'src/components/Shared/Buttons/AddTitleButton/AddTitleButton';
import ToggleButton from '../Buttons/ToggleButton';

const DisplayOption: React.FC = () => {
  const [height, setHeight] = useState<number>(0);
  const wrapperRef = useRef(null);
  const [collapse, setCollapse] = useState<boolean>(false);
  const parent = useSelector((state: RootState) => state.nestedHeight.parent);
  const dispatch = useDispatch();
  const [currentParent, setCurrentParent] = useState<{
    index: number;
    height: number;
    title: string;
  } | null>(null);

  const handleSetHeight = () => {
    setCollapse((collapse) => !collapse);
    dispatch(removeFromParent({ index: currentParent?.index }));

    if (height === 0) {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height + wrapperRef.current.offsetHeight,
          title: 'Display Options',
        })
      );

      setHeight(wrapperRef.current.offsetHeight);
    } else {
      dispatch(
        setParent({
          index: currentParent?.index,
          height: currentParent?.height - wrapperRef.current.offsetHeight,
          title: 'Display Options',
        })
      );

      setHeight(0);
    }
  };

  useEffect(() => {
    setCurrentParent(parent.find((obj) => obj.title === 'Display Options'));
  }, [handleSetHeight, collapse]);

  return (
    <div className={Styles.displayOptionWrapper}>
      <div
        onClick={() => {
          setCollapse((collapse) => !collapse);
          handleSetHeight();
        }}
        className={Styles.displayOption}
      >
        <span className={Styles.displayOption__title}>Display Options</span>
        <button>
          {collapse ? (
            <AiIcons.AiOutlineMinusCircle className={Styles.collapse_icon} />
          ) : (
            <AiIcons.AiOutlinePlusCircle className={Styles.collapse_icon} />
          )}
        </button>
      </div>

      <div
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          width: '100%',
          transition: 'all 1.5s ease',
        }}
      >
        <div ref={wrapperRef}>
          <div className={Styles.displayDataWrapper}>
            {displayData.map((obj, index) => (
              <ChildInput key={index} type='text' placeholder={obj.title} />
            ))}
          </div>
          <div className={Styles.title}>Advanced</div>
          <div className={Styles.displayDataWrapper}>
            <ChildInput type='text' placeholder='Background Color' />

            <div className={Styles.displayDataImageWrapper}>
              <img src='/assets/images/female.png' alt='Picture of a Lady' />
              <AddTitleButton
                style={{ padding: 0, margin: '.5rem auto' }}
                title='Add Logo'
              />
            </div>

            <ToggleButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayOption;
