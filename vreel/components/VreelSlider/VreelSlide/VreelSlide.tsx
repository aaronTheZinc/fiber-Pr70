import React, { useState, useEffect, useRef } from "react";
import { VreelModal } from "../../Shared/VreelModal/VreelModal";
import { Player } from "video-react";
import { useAuth } from "../../../contexts/UserContext";

const VreelSlide = ({
  username,
  user,
  slideId,
  slide,
  currentSlide,
  swiper,
  isChanged,
  isMuted,
  setMuted,
}): JSX.Element => {
  // const hasPlayer = useRef<boolean>(false);
  const slideEl = useRef(null);
  const audioEl = useRef(null);
  const videoEl = useRef(null);
  useEffect(() => {
    videoEl.current.defaultMuted = true;
  });

  const [isFollowed, setIsFollowed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const auth = useAuth();
  const toggleSlideFollow = () => {
    setIsFollowed(!isFollowed);
  };
  const toggleSlideLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleSlideSound = () => {
    // setIsMuted(!isMuted);
    isMuted ? audioEl.current.play() : audioEl.current.pause();
    // isChanged && audioEl.current.pause()
  };
  useEffect(() => {
    if (currentSlide === slideId) {
      videoEl.current.play();
    } else {
      videoEl.current.pause();
    }
  }, [currentSlide]);

  useEffect(() => {
    // console.log("[swiper]: ", swiper);
    // console.log("[slide id]: ", slideId);
    // slideId !== 0 ? videoEl.current.pause() : videoEl.current.play();
    // console.log("this is skide video", swiper, slideId);
  }, []);
  console.log("user slides is", user?.vreel?.slides);
  return (
    <section
      ref={slideEl}
      id={slideId}
      className="vreel-slide vreel-slide__wrapper"
    >
      {/* <img src="https://images.unsplash.com/photo-1626715185400-49cccfabc10f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" alt="background img" className="vreel-slide__background-img" /> */}

      <video
        ref={videoEl}
        className="vreel-slide__background-video"
        autoPlay
        muted={isMuted}
        onEnded={(e) => {
          swiper.slideNext();
          console.log("ended", currentSlide, slideId);
        }}
      >
        <source src={slide} type="video/mp4"></source>
        Your browser does not support the video tag.
      </video>

      <div className="vreel-slide__overlay"></div>

      <div className="vreel-slide__text-wrapper">
        <h1 className="vreel-slide__heading-text">
          {username
            ? `${username}'s vreel`
            : "THE INTERFACE THAT VISUALLY ELEVATES YOUR BRAND™"}
        </h1>
        <p className="vreel-slide__text">
          Upload some files in file manager and then use editor to personalize
          your Vreel
        </p>
        <div className="vreel-slide__btn-wrapper">
          {username ? (
            <>
              <a
                className="vreel-slide__btn"
                href="#"
                onClick={(e) => {
                  console.log("auth", auth.user);
                }}
              >
                {username}'s Button
              </a>
              <a className="vreel-slide__btn" href="#">
                {username} choose a url
              </a>
            </>
          ) : (
            <>
              <a className="vreel-slide__btn" href="/register">
                Register
              </a>
              <a className="vreel-slide__btn" href="/login">
                Login
              </a>
            </>
          )}
        </div>
      </div>

      <img
        src="/down-arrow.png"
        alt="down arrow"
        className="vreel-slide__down-arrow"
      />
      <div className="vreel-slide__left-icons__wrapper">
        <VreelModal icon="/background-credit-icon.svg" />
        {isMuted ? (
          <img
            onClick={() => setMuted(!isMuted)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Toggle Slide Sound"
            src="/slide-sound-mute-icon.svg"
            alt="slide-sound-mute-icon"
            className="vreel-slide__icon vreel-slide__icon-sound"
          />
        ) : (
          <img
            onClick={() => setMuted(!isMuted)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Toggle Slide Sound"
            src="/slide-sound-icon.svg"
            alt="slide-sound-icon"
            className="vreel-slide__icon vreel-slide__icon-sound"
          />
        )}
      </div>
      <aside className="vreel-slide__right-icons__wrapper">
        <div className="top">
          <a href="tel:+17734453322">
            <img
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Call Me at 773-445-3322"
              src="/call-icon.svg"
              alt="call-icon"
              className="vreel-slide__icon"
            />
          </a>

          {/* <VreelModal isContact={true} icon="/add-to-contact-icon.svg" /> */}
          <a
            href={
              username
                ? `/api/vcard?username=${username}`
                : "/api/vcard?username=vreel"
            }
            download={username ? `${username}.vcf` : "vreel.vcf"}
          >
            <img
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Download My Vcard"
              src="/add-to-contact-icon.svg"
              alt="add-to-contact-icon"
              className="vreel-slide__icon"
            />
          </a>
          {isFollowed ? (
            <img
              onClick={toggleSlideFollow}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Remove this Slide from your Feed"
              src="/followed-icon.svg"
              alt="followed-icon"
              className="vreel-slide__icon"
            />
          ) : (
            <img
              onClick={toggleSlideFollow}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Add this Slide to your Feed"
              src="/follow-icon.svg"
              alt="follow-icon"
              className="vreel-slide__icon"
            />
          )}
        </div>

        <div className="bottom">
          <VreelModal isSocial={true} icon="/share-icon.svg" />
          {isLiked ? (
            <img
              onClick={toggleSlideLike}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Like My Vreel"
              src="/liked-icon.svg"
              alt="liked-icon"
              className="vreel-slide__icon"
            />
          ) : (
            <img
              onClick={toggleSlideLike}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Like My Vreel"
              src="/like-icon.svg"
              alt="like-icon"
              className="vreel-slide__icon"
            />
          )}
          <VreelModal icon="/slide-credit-icon.svg" />
          <VreelModal isQr={true} icon="/qr-icon.svg" />
        </div>
      </aside>
      <audio
        ref={audioEl}
        id="vreelBackgroundAudio"
        loop={true}
        // src="/background-vreel.mp3"
      ></audio>
    </section>
  );
};

export default VreelSlide;
