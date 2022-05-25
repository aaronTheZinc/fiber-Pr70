import { Navigation, Pagination } from "swiper";
import type { User } from "../../types";
import { StaticMainPageContent } from "../../data";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VreelSlide from "./VreelSlide/VreelSlide";
import { useEffect, useRef, useState } from "react";

interface VreelSliderProps {
  isUser?: boolean;
  username?: string;
  user?: User;
  data?: any;
}
export const VreelSlider = ({
  isUser,
  username,
  user,
  data,
}: VreelSliderProps): JSX.Element => {
  let slides = user ? user.vreel.slides : false;
  const [isChanged, setIsChanged] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  useEffect(() => {
    console.log("pexels ", data);
  }, [currentSlide, swiper]);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      // style={{ height: "100vh" }}
      slidesPerView={1}
      navigation
      pagination={true}
      onSlideChange={(slide) => {
        setCurrentSlide(slide.realIndex);
        console.log("slide change", slide.realIndex);
      }}
      noSwiping
      loop
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      {user
        ? user.vreel.slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              {console.log("[props]: ", idx, slide)}
              <VreelSlide
                vreelId={user.id}
                slide={slide}
                swiper={swiper}
                currentSlide={currentSlide}
                isChanged={isChanged}
                slideId={idx}
                user={user}
                username={username}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
              />
            </SwiperSlide>
          ))
        : [{ link: "/waterfall.mp4" }, { link: "/waterfall2.mp4" }]?.map(
            (video, idx) => (
              <SwiperSlide key={idx}>
                <VreelSlide
                  vreelId="default"
                  username={false}
                  user={false}
                  slide={video}
                  swiper={swiper}
                  currentSlide={currentSlide}
                  slideId={idx}
                  isChanged={isChanged}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                />
              </SwiperSlide>
            )
          )}
      {/* {[
        "https://vod-progressive.akamaized.net/exp=1650386813~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F685%2F13%2F328428416%2F1287384853.mp4~hmac=b2cc8998227798294bc641c662c6855f1a86ba3bfd1cc9262fdc510bb36ff407/vimeo-prod-skyfire-std-us/01/685/13/328428416/1287384853.mp4?filename=Pexels+Videos+2098989.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      ].map((url, idx) => (
        <SwiperSlide virtualIndex={idx} key={idx}>
          <VreelSlide
            isMuted={isMuted}
            setMuted={setIsMuted}
            username={false}
            user={false}
            slide={url}
            swiper={swiper}
            currentSlide={currentSlide}
            slideId={idx}
            isChanged={isChanged}
          />
        </SwiperSlide>
      ))} */}
    </Swiper>
  );
};
