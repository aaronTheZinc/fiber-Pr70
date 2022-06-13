import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import VreelSlider from '../../VreelSlider/VreelSlider';
import Styles from './MobilePreview.module.scss';

const MobilePreview = () => {
  const { getMediaDesktopLink } = useSelector(
    (state: RootState) => state.mobileMediaSelector
  );
  return (
    <div className={Styles.showMobilePreview}>
      {/* {getMediaDesktopLink.link.length ? (
        <div className={Styles.showMobilePreview__bgImg}>
          <img src={getMediaDesktopLink.link} alt="Slides Images" />
        </div>
      ) : (
        <div className={Styles.showMobilePreview__text}>
          <h3>Preview</h3>
        </div>
      )} */}
      <VreelSlider view='Mobile' />
    </div>
  );
};

export default MobilePreview;
