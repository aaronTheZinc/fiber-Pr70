import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import Styles from "./GalleryContent.module.scss";

const GalleryContent = ({
  setPlaying,
  playing,
  isImage,
  setMute,
  mute,
  item,
}) => {
  const router = useRouter();
  const {
    image_header,
    description,
    cta1,
    cta2
  } = item
  return (
    <div className={Styles.media__content}>
      <div className={Styles.media__content_wrapper}>
        {/* LEFT SIDEBAR */}
        <div className={Styles.media__content_wrapper__left}>
          <div></div>
          <div className={Styles.media__content_wrapper__left__bottom}>
            <button
              onClick={() => {
                setPlaying(!playing);
              }}
              className={Styles.media__content_wrapper__left__bottom__pauseBtn}
            >
              {playing ? (
                <img src="/assets/icons/pause.svg" alt="Pause Icons" />
              ) : (
                <div
                  className={
                    Styles.media__content_wrapper__left__bottom__pauseBtn__playIcon
                  }
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src="/assets/icons/play.svg"
                    alt="Play Icons"
                  />
                </div>
              )}
            </button>
            {(item.background_audio_uri || !isImage) && (
              <button
                onClick={() => {
                  setMute(!mute);
                }}
                style={{ marginTop: "1rem" }}
                className={Styles.media__content_wrapper__left__bottom__muteBtn}
              >
                <img
                  src={`/assets/${mute ? "icons/audioOff.svg" : "icons/audioOn.svg"
                    }`}
                  alt="Mute Icon"
                />
              </button>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div
          className={Styles.media__content_wrapper__middle}
          id={Styles.middle}
        >
          <div className={Styles.media__content_wrapper__middle__container}>
            <h3>{image_header}</h3>
            <p>{item.description}</p>

            {
              <div>
                {
                  <div className={Styles.button_container}>
                    {cta1 ? (
                      <button
                        className="btn-slide"
                        onClick={() => window.open(cta1?.link_url)}
                      >
                        {cta1.link_header}
                      </button>
                    ) : <></>
                    }
                    {
                      cta2 ? (
                        <button className="btn-slide" onClick={() => window.open(cta2?.link_url)}>
                          {cta2.link_header}
                        </button>
                      ) : <></>
                    }

                  </div>
                }
              </div>
            }
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ width: "32px" }}></div>
      </div>
    </div>
  );
};

export default GalleryContent;
