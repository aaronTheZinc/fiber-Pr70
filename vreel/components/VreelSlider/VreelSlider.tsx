import { Navigation, Pagination } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VreelSlide from "./VreelSlide/VreelSlide";

export const VreelSlider = ({ isUser, username, user }): JSX.Element => {
  let slides = new Array("a", "b", "c", "d");
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      style={{ height: "100vh" }}
      slidesPerView={1}
      navigation
      pagination={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.length > 0
        ? slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <VreelSlide slideId={idx} user={user} username={username} />
            </SwiperSlide>
          ))
        : slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <VreelSlide />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};
