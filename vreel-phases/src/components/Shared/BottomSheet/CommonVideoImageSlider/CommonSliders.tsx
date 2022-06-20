import React, { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Styles from "./CommonSlider.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import clsx from "clsx";
import { useAppDispatch } from "src/redux/store/store";
import { useRouter } from "next/router";
import { FaPause, FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { HiOutlineMenu } from "react-icons/hi";
import { expandMenu } from "src/redux/createSlice/createMenuSlice";
import useWindowDimensions from "src/hooks/useWindowDimensions";

const CommonSliders: React.FC<{
  items: any;
  children?: ReactNode;
  parentSwiper: any;
  title?: String;
}> = ({ items, children, parentSwiper, title }) => {
  const [mute, setMute] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  console.log({ items });

  return (
    <div className="videoSlider">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        speed={1500}
        autoplay={{
          delay: 5000,
        }}
        className={clsx(Styles.vreelSlider, Styles.vreelSlider_mobile)}
      >
        {items.map((slide, index: number) => {
          const { cta1, cta2, desktop, mobile } = slide;
          const isMobile = width < 500;
          const item = isMobile ? mobile : desktop;
          const isImage = item.content_type == "image";
          console.log({ items });

          return (
            <SwiperSlide key={index} className={Styles.vreelSlide}>
              <div className={Styles.vreelSlide__container}>
                <div
                  className={Styles.image_container}
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    zIndex: "10",
                  }}
                >
                  {isImage ? (
                    <img
                      className={Styles.image}
                      src={item.uri}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <ReactPlayer
                      playing={pause}
                      muted={mute}
                      url={item.uri}
                      //   url="/assets/videos/test-video-3.mp4"
                      playsinline={true}
                      config={{
                        file: {
                          attributes: {
                            autoPlay: true,
                            playsInline: true,
                            muted: mute,
                            type: "video",
                            style: {
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: -2,
                              height: "100%",
                              width: "100%",
                              objectFit: "cover",
                            },
                          },
                        },
                      }}
                    />
                  )}
                </div>

                <div
                  className={Styles.vreelSlide__content}
                  style={{ padding: "1rem 3rem" }}
                >
                  <div className={Styles.menuContainer}>
                    <p>{title}</p>
                    <div
                      className={Styles.menuContainer__menu}
                      onClick={() => dispatch(expandMenu())}
                    >
                      <HiOutlineMenu />
                    </div>
                  </div>
                  <div className={Styles.vreelSlide__content_wrapper}>
                    {/* LEFT SIDEBAR */}
                    <div className={Styles.vreelSlide__content_wrapper__left}>
                      <div></div>

                      <div
                        className={
                          Styles.vreelSlide__content_wrapper__left__bottom
                        }
                        style={{ marginBottom: "2rem" }}
                      >
                        <button
                          onClick={() => setPause(!pause)}
                          className={
                            Styles.vreelSlide__content_wrapper__left__bottom__pauseBtn
                          }
                        >
                          {pause ? <FaPause /> : <FaPlay />}
                        </button>

                        <button onClick={() => setMute(!mute)}>
                          <img
                            src={`/assets/${
                              mute ? "icons/audioOff.svg" : "icons/audioOn.svg"
                            }`}
                            alt="Mute Icon"
                          />
                        </button>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className={Styles.vreelSlide__content_wrapper__middle}
                      style={{ marginBottom: "2rem" }}
                    >
                      <div
                        className={
                          Styles.vreelSlide__content_wrapper__middle__container
                        }
                      >
                        <h3>{item?.header ? item.header : "VREEL™"}</h3>
                        <p>
                          {item?.description
                            ? item.description
                            : "We make you look better! Our Web3 interface curates and displays your story amazingly."}
                        </p>

                        {
                          <div>
                            {
                              <div className={Styles.button_container}>
                                <button
                                  className="btn-slide"
                                  onClick={() => router.push("/register")}
                                >
                                  Sign Up
                                </button>
                                <button
                                  className="btn-slide"
                                  onClick={() => {}}
                                >
                                  Learn More
                                </button>
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </div>
                    <div
                      className={Styles.vreelSlide__content__bottomSheet}
                      onClick={() => {
                        parentSwiper?.slideNext();
                      }}
                    >
                      <img
                        src="/assets/icons/carrot-down.svg"
                        alt="Carrot Down images"
                      />
                    </div>
                    {/* RIGHT SIDEBAR */}
                  </div>
                </div>
                {/* VIDEO PLAYER */}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {children}
    </div>
  );
};

export default CommonSliders;
