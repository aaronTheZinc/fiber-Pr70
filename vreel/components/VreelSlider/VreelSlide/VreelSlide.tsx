import React, { useState, useEffect, useRef } from "react";
import { VreelModal } from "../../Shared/VreelModal/VreelModal";
import { Player } from "video-react";
import { useAuth } from "../../../contexts/UserContext";
import { User, Slide } from "../../../types";
import { followSlide } from "../../../graphql/mutations";
import { useCookies } from "react-cookie";
import QRCode from "qrcode.react";
let BASE_URL = "";
const current_env = process.env.ENVIRONMENT;
if (current_env === "dev") {
  BASE_URL = "http://localhost:3000";
} else if (current_env === "staging") {
  BASE_URL = "https://staging.vreel.page";
} else {
  BASE_URL = "https://dev1.vreel.page";
}

interface VreelSlideProps {
  username: any;
  user: User | any;
  slideId: any;
  slide: Slide | any;
  currentSlide: number;
  vreelId: string;
  swiper: any;
  isChanged: boolean;
  isMuted: boolean;
  setIsMuted: (v: boolean) => void;
}

const VreelSlide = ({
  username,
  user,
  slideId,
  slide,
  currentSlide,
  swiper,
  isChanged,
  isMuted,
  setIsMuted,
  vreelId,
}: VreelSlideProps): JSX.Element => {
  // const hasPlayer = useRef<boolean>(false);
  const slideEl = useRef(null);
  const audioEl = useRef(null);
  const videoEl = useRef(null);
  useEffect(() => {
    try {
      videoEl.current.defaultMuted = true;
    } catch (e) {}
  });
  const [{ userAuthToken }, _] = useCookies(["userAuthToken"]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [timeout, setTimeoutId] = useState<NodeJS.Timeout>(null);
  const auth = useAuth();
  const toggleSlideFollow = async () => {
    if (!isFollowed) {
      const r = await followSlide(userAuthToken, vreelId);
      console.log("following vreel ->", vreelId);
      console.log(r);
    }
    setIsFollowed(!isFollowed);
  };
  const toggleSlideLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    console.log("bug -> slide", slide);
    if (username) {
      setIsVideo(slide?.mobile?.content_type?.includes("video"));
    } else {
      setIsVideo(true);
    }
    console.log();
  }, []);
  useEffect(() => {
    try {
      if (currentSlide === slideId) {
        videoEl.current.play();
        if (!isVideo) {
        } else {
          clearTimeout(timeout);
        }
      } else {
        videoEl.current.pause();
      }
    } catch (e) {}
  }, [currentSlide]);

  useEffect(() => {
    // console.log("[swiper]: ", swiper);
    // console.log("[slide id]: ", slideId);
    // slideId !== 0 ? videoEl.current.pause() : videoEl.current.play();
    // console.log("this is skide video", swiper, slideId);
  }, []);
  return (
    <section
      ref={slideEl}
      id={slideId}
      className="vreel-slide vreel-slide__wrapper"
    >
      {/* <img src="https://images.unsplash.com/photo-1626715185400-49cccfabc10f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" alt="background img" className="vreel-slide__background-img" /> */}
      {username ? (
        <>
          {isVideo ? (
            <video
              ref={videoEl}
              className="vreel-slide__background-video"
              autoPlay
              muted={isMuted}
              playsInline={true}
              onEnded={(e) => {
                swiper.slideNext();
                console.log("ended", currentSlide, slideId);
              }}
            >
              <source
                src={username ? slide.mobile.uri : slide?.video_files[0].link}
                type={"video/mp4"}
              ></source>
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={slide.mobile.uri}
              className="vreel-slide__background-video"
            />
          )}
        </>
      ) : (
        <>
          <video
            ref={videoEl}
            className="vreel-slide__background-video"
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={(e) => {
              swiper.slideNext();
              console.log("ended", currentSlide, slideId);
            }}
          >
            <source src={slide.link} type={"video/mp4"}></source>
            {console.log("link ->", slide.link)}
            Your browser does not support the video tag.
          </video>
        </>
      )}

      <div className="vreel-slide__overlay"></div>

      <div className="vreel-slide__text-wrapper">
        <h1 className="vreel-slide__heading-text">
          {username
            ? (slide as Slide)?.title?.header
            : "VREEL™\nTHE INTERFACE THAT VISUALLY ELEVATES YOUR BRAND™"}
        </h1>
        <div className="vreel-slide__btn-wrapper">
          {username ? (
            <>
              <a
                className="vreel-slide__btn"
                onClick={(e) => {
                  window.open((slide as Slide)?.cta1?.link_url, "_replace");
                }}
              >
                {(slide as Slide)?.cta1?.link_header}
              </a>
              <a
                className="vreel-slide__btn"
                onClick={(e) => {
                  window.open((slide as Slide)?.cta2?.link_url, "_replace");
                }}
              >
                {(slide as Slide)?.cta2?.link_header}
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
      <div
        style={{ marginBottom: "1pc" }}
        className="vreel-slide__left-icons__wrapper"
      >
        {isVideo ? (
          <>
            <VreelModal icon="/background-credit-icon.svg" />

            {isMuted ? (
              <img
                style={{ height: "65px" }}
                onClick={() => setIsMuted(!isMuted)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Toggle Slide Sound"
                src="/slide-sound-mute-icon.png"
                alt="slide-sound-mute-icon"
                className="vreel-slide__icon vreel-slide__icon-sound"
              />
            ) : (
              <img
                style={{ height: "65px" }}
                onClick={() => setIsMuted(!isMuted)}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Toggle Slide Sound"
                src="/slide-sound-icon.png"
                alt="slide-sound-icon"
                className="vreel-slide__icon vreel-slide__icon-sound"
              />
            )}
          </>
        ) : (
          <></>
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
          <div>
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
          {/* <div style={{ alignItems: "center" }}>
            <label style={{ marginRight: "0.7pc" }} className="subIconLabel">
              Follow
            </label>
          </div> */}
        </div>

        <div style={{ marginBottom: "1pc" }} className="bottom">
          <VreelModal title="Info" icon="/slide-credit-icon.svg" />
          <div>
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
          </div>
          <VreelModal title="Share" isSocial={true} icon="/share-icon.svg" />
          {username ? (
            <QRCode
              style={{ width: "50px", height: "50px" }}
              value={`${BASE_URL}/${username}/${slideId}`}
            />
          ) : (
            <></>
          )}
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
