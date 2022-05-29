import { useEffect, useRef, useState } from 'react';
import VreelSlide from './VreelSlide';
import GeneralMenu from '../Shared/Menu/GeneralMenu/GeneralMenu';
import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';
import AccountMenu from '../Shared/Menu/AccountMenu/AccountMenu';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Lazy } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Styles from './VreelSlider.module.scss';

const data = [
  { src: '/assets/videos/test-video-1.mp4', alt: 'slide-1' },
  { src: '/assets/videos/test-video-2.mp4', alt: 'slide-2' },
  { src: '/assets/videos/test-video-3.mp4', alt: 'slide-3' },
  // { src: '/assets/videos/test-video-4.mp4', alt: 'slide-4' },
  // { src: '/assets/videos/test-video-5.mp4', alt: 'slide-5' },
];

const VreelSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(null);
  const [swiper, setSwiper] = useState(null);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop
      navigation
      pagination
      slidesPerView={1}
      onSlideChange={(slide) => {
        setCurrentSlide(slide.realIndex);
      }}
      speed={1500}
      autoplay={{
        delay: 10000,
      }}
      onSwiper={(swiper) => {
        setSwiper(swiper);
      }}
      // effect='fade'
      className={Styles.vreelSlider}
    >
      {data.map((obj, index) => (
        <SwiperSlide key={index} className={Styles.vreelSlide}>
          <VreelSlide
            slide={obj}
            currentSlide={currentSlide}
            swiper={swiper}
            slideId={index}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VreelSlider;
