import { Navigation, Pagination } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VreelSlide from "./VreelSlide/VreelSlide";
import { useState } from "react";

export const VreelSlider = ({ isUser, username, user }): JSX.Element => {
  let slides = user ? user.vreel.slides : ['a', 'b', 'c', 'd'];
  const [isChanged, setIsChanged] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(null)
  const [swiper, setSwiper] = useState(null)
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      style={{ height: "100vh" }}
      slidesPerView={1}
      navigation
      pagination={true}
      onSlideChange={(slide) => {
        setIsChanged(true)
        setCurrentSlide(slide)
        console.log("slide change", user)
      }}
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      {slides.length > 0
        ? slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <VreelSlide slide={slide} swiper={swiper} currentSlide={currentSlide} isChanged={isChanged} slideId={idx} user={user} username={username} />
            </SwiperSlide>
          ))
        : slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <VreelSlide slide={slide} swiper={swiper} currentSlide={currentSlide} slideId={idx} isChanged={isChanged} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};
