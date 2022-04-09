import { Navigation, Pagination } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VreelSlide from "./VreelSlide/VreelSlide";
import { useEffect, useState } from "react";

export const VreelSlider = ({ isUser, username, user, data }): JSX.Element => {
  let slides = user ? user.vreel.slides : false
  const [isChanged, setIsChanged] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(null)
  const [swiper, setSwiper] = useState(null)
  
  useEffect(() => {
    
  }, [isChanged])
  

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      style={{ height: "100vh" }}
      slidesPerView={1}
      navigation
      pagination={true}
      onSlideChange={(slide) => {
        console.log("slide change", slide.realIndex)
      }}
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      {user ?  user.vreel.slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <VreelSlide slide={slide} swiper={swiper} currentSlide={currentSlide} isChanged={isChanged} slideId={slide.id} user={user} username={username} />
            </SwiperSlide>
          ))
        : data.map((video, idx) => (
          <SwiperSlide key={idx}>
            <VreelSlide username={false} user={false} slide={video} swiper={swiper} currentSlide={currentSlide} slideId={idx} isChanged={isChanged} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
