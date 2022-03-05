import { Navigation, Pagination } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import VreelSlide from './VreelSlide';

export const VreelSlider = (): JSX.Element => {
  return (
    <Swiper
    modules={[Navigation, Pagination]}
    style={{ height: '100vh' }}
      slidesPerView={1}
      navigation
      pagination={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <VreelSlide />
      </SwiperSlide>
      <SwiperSlide>
        <VreelSlide />
      </SwiperSlide>
      <SwiperSlide>
        <VreelSlide />
      </SwiperSlide>
      <SwiperSlide>
        <VreelSlide />
      </SwiperSlide>
      <SwiperSlide>
        <VreelSlide />
      </SwiperSlide>
    </Swiper>
  );
};