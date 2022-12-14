import React, { CSSProperties, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from "./SliderContent.module.scss";
import ReactHtmlParser from "react-html-parser";
import { RootState, useAppDispatch } from "@redux/store/store";
import {
  expandMenu,
  expandQR,
  expandShare,
} from "@redux/createSlice/createMenuSlice";
import { getHeroSliderSchema } from "../../schema";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const { FollowMutation, unFollowMutation, likeMutation, unlikeMutation } =
  getHeroSliderSchema();

const SliderContent: React.FC<{
  item: any;
  slide: any;
  mute: boolean;
  setMute: Function;
  isImage: boolean;
  parentSwiper: any;
  playing: boolean;
  setPlaying: Function;
}> = ({
  mute,
  setMute,
  isImage,
  item,
  slide,
  parentSwiper,
  playing,
  setPlaying,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [following, setfollowing] = useState(false);
  const [like, setlike] = useState(false);
  const [follow] = useMutation(FollowMutation);
  const [unfollow] = useMutation(unFollowMutation);
  const [like_fun] = useMutation(likeMutation);
  const [unlike_fun] = useMutation(unlikeMutation);
  const [cookies] = useCookies(["userAuthToken"]);
  const [text, setText] = useState(0);
  const { username, section, employee } = router?.query;
  const vreel = useSelector((state: any) => state?.vreel?.vreel);
  const { title, id, cta1, cta2, cta3, advanced, desktop, mobile } = slide;
  console.log("3. Slider content rendered...");

  useEffect(() => {
    if (cta1 || cta2) {
      if (cta1?.link_header.length > 12 || cta2?.link_header.length > 12) {
        setText(13);
      } else {
        setText(10);
      }
    }
  }, [text]);

  return (
    <div className={Styles.media__content}>
      <div className={Styles.media__content_wrapper}>
        {/* logo */}
        <div className={Styles.media__content_wrapper__vreelLogo}>
          <img
            src={
              vreel?.logo_uri
                ? vreel?.logo_uri
                : "/assets/icons/Vreel_logo_small.svg"
            }
            alt="Brand Logo"
          />
        </div>
        {/* LEFT SIDEBAR */}
        <div className={Styles.media__content_wrapper__left}>
          <div></div>

          <div className={Styles.media__content_wrapper__left__bottom}>
            {!isImage ? (
              <button
                onClick={() => {
                  setPlaying(!playing);
                }}
                className={
                  Styles.media__content_wrapper__left__bottom__pauseBtn
                }
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
            ) : (
              <button>
                <div
                  className={
                    Styles.media__content_wrapper__left__bottom__pauseBtn__playIcon
                  }
                ></div>
              </button>
            )}
            {(item.background_audio_uri || !isImage) && (
              <button
                onClick={() => {
                  setMute(!mute);
                  // if (!playing) {
                  //   setPlaying(true);
                  // }
                }}
                style={{ marginTop: "1rem" }}
                className={Styles.media__content_wrapper__left__bottom__muteBtn}
              >
                <img
                  src={`/assets/${
                    mute ? "icons/audioOff.svg" : "icons/audioOn.svg"
                  }`}
                  alt="Mute Icon"
                />
              </button>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className={Styles.media__content_wrapper__middle}>
          <div className={Styles.media__content_wrapper__middle__container}>
            <h3>{title?.header ? title.header : "VREEL???"}</h3>
            <p>
              {title?.description
                ? title.description
                : "We make you look better! Our Web3 interface curates and displays your story amazingly."}
            </p>
            {cta1?.link_header && cta2?.link_header && cta3?.link_header ? (
              <div>
                {
                  <div className={Styles.button_container_2}>
                    {cta1?.link_header && (
                      <button
                        className="btn-employee"
                        onClick={() => {
                          console.log(cta1);

                          switch (cta1?.link_type) {
                            // case "URL":
                            case "url":
                            case "URL":
                            case "":
                              if (cta1.link_url.startsWith("https://"))
                                window.open(cta1?.link_url, "_blank");
                              else router.push(cta1?.link_url);

                              break;

                            default:
                              break;
                          }
                        }}
                      >
                        <img
                          src="/assets/icons/add_contact.svg"
                          alt="Contact Logo"
                        />
                        <span> {ReactHtmlParser(cta1?.link_header)}</span>
                      </button>
                    )}

                    {cta2.link_header && cta2?.link_url && (
                      <button
                        className="btn-employee"
                        onClick={() => {
                          console.log(cta2);

                          switch (cta2.link_type) {
                            // case "URL":
                            case "url":
                            case "URL":
                            case "":
                              if (cta2.link_url.startsWith("https://"))
                                window.open(cta2?.link_url, "_blank");
                              else router.push(cta2?.link_url);
                              break;

                            default:
                              break;
                          }
                        }}
                      >
                        <img
                          src="/assets/icons/socials/linkedin.svg"
                          alt="LinkedIn Logo"
                        />
                        <span> {ReactHtmlParser(cta2?.link_header)}</span>
                      </button>
                    )}

                    {/*  {cta3.link_header && (
                      <button
                        className="btn-employee"
                        onClick={() => {
                          console.log(cta2);

                          switch (cta3.link_type) {
                            // case "URL":
                            case "":
                              if (cta3.link_url.includes("https://www"))
                                window.open(cta3?.link_url, "_blank");
                              else router.push(cta3?.link_url);
                              break;

                            default:
                              break;
                          }
                        }}
                      >
                        <img
                          src="/assets/icons/share-plan.svg"
                          alt="Share Icons"
                        />
                        <span> {ReactHtmlParser(cta3?.link_header)}</span>
                      </button>
                    )} */}
                  </div>
                }
              </div>
            ) : (
              (cta1?.link_header || cta2?.link_header) && (
                <div>
                  {
                    <div
                      className={Styles.button_container}
                      style={
                        {
                          "--direction": `${text > 12 ? "column" : "row"}`,
                          "--marginBottom": `${text > 12 ? ".5" : "0"}rem`,
                          "--marginRight": `${text > 12 ? "0" : "1"}rem`,
                        } as CSSProperties
                      }
                    >
                      {cta1?.link_header && (
                        <button
                          className="btn-slide"
                          onClick={() => {
                            console.log(cta1);

                            switch (cta1?.link_type) {
                              // case "URL":
                              case "url":
                              case "URL":
                              case "":
                                if (cta1.link_url.startsWith("https://"))
                                  window.open(cta1?.link_url, "_blank");
                                else router.push(cta1?.link_url);

                                break;

                              default:
                                break;
                            }
                          }}
                        >
                          {cta1?.link_header}
                        </button>
                      )}

                      {cta2.link_header && (
                        <button
                          className="btn-slide"
                          onClick={() => {
                            console.log(cta2);

                            switch (cta2.link_type) {
                              // case "URL":
                              case "url":
                              case "URL":
                              case "":
                                if (cta2.link_url.startsWith("https://"))
                                  window.open(cta2?.link_url, "_blank");
                                else router.push(cta2?.link_url);
                                break;

                              default:
                                break;
                            }
                          }}
                        >
                          {cta2.link_header}
                        </button>
                      )}
                    </div>
                  }
                </div>
              )
            )}
            {!id && (
              <div>
                {
                  <div
                    className={Styles.button_container}
                    style={
                      {
                        "--direction": `${text > 12 ? "column" : "row"}`,
                        "--marginBottom": `${text > 12 ? ".5" : "0"}rem`,
                        "--marginRight": `${text > 12 ? "0" : "1"}rem`,
                      } as CSSProperties
                    }
                  >
                    <button
                      className="btn-slide"
                      onClick={() => router.push("/login")}
                    >
                      Log in
                    </button>

                    <button
                      className="btn-slide"
                      onClick={() => router.push("/register")}
                    >
                      Register
                    </button>
                  </div>
                }
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className={Styles.media__content_wrapper__right}>
          <div className={Styles.media__content_wrapper__right__topContainer}>
            <button onClick={() => dispatch(expandMenu())}>
              <img src="/assets/icons/menu.svg" alt="Menu Icons" />
            </button>
            {/*  {<button
              onClick={() => {
                if (!following) {
                  follow({
                    variables: {
                      token: cookies.userAuthToken,
                      target: slide.id,
                    },
                  })
                    .then((res) => {
                      toast.success("Following succeeded!");
                      setfollowing(true);
                    })
                    .catch((err) => {});
                } else {
                  unfollow({
                    variables: {
                      token: cookies.userAuthToken,
                      target: slide.id,
                    },
                  })
                    .then((res) => {
                      toast.success("Unfollow succeeded!");
                      setfollowing(false);
                    })
                    .catch((err) => {});
                }
              }}
            >
              
              {following ? (
                <img src="/assets/following.svg" alt="Following Icon" />
              ) : (
                <img src="/assets/icons/icon-follow.svg" alt="Follow Icon" />
              )}
            </button>} */}
            <button
              onClick={async () => {
                // const res = await fetch("/api/vcard").then((res) =>
                //   res.json()
                // );
                // console.log({ res });
              }}
            >
              {/* &&interprise=&&employeeid= */}
              <a
                href={
                  employee
                    ? `/api/vcard?username=${
                        username ? username : ""
                      }&employee=${employee}`
                    : `/api/vcard?username=${username ? username : ""}`
                }
              >
                <img src="/assets/icons/add_contact.svg" alt="V-Card Icon" />
              </a>
            </button>
          </div>

          <div>
            {/*  <button onClick={() => dispatch(expandInfo())}>
          <img src="/assets/icons/icon-info.svg" alt="Info Icon" />
        </button> */}
            {/* <button
              onClick={() => {
                if (!like) {
                  like_fun({
                    variables: {
                      token: cookies.userAuthToken,
                      target: slide.id,
                    },
                  })
                    .then((res) => {
                      // toast.success("Following succeeded!");
                      setlike(true);
                    })
                    .catch((err) => {});
                } else {
                  unlike_fun({
                    variables: {
                      token: cookies.userAuthToken,
                      target: slide.id,
                    },
                  })
                    .then((res) => {
                      
                      setlike(false);
                    })
                    .catch((err) => {});
                }
              }}
            >
              <img
                src={`/assets/icons/heart-${like ? "fill" : "empty"}.svg`}
                alt="like Icon"
              />
            </button> */}

            <button
              onClick={() => {
                dispatch(expandShare());
                // setAutoPlay(false);
              }}
            >
              <img src="/assets/icons/share-plan.svg" alt="Share Icon" />
            </button>

            <button onClick={() => dispatch(expandQR())}>
              <img src="/assets/icons/icons-qr-code.svg" alt="QR Icon" />
            </button>
          </div>
        </div>
      </div>
      {parentSwiper?.activeIndex !==
        parseInt(parentSwiper?.slides?.length) - 1 && (
        <div
          className={Styles.media__content__bottomSheet}
          onClick={() => {
            parentSwiper.slideNext();
          }}
        >
          <img src="/assets/icons/carrot-down.svg" alt="Carrot Down images" />
        </div>
      )}
    </div>
  );
};

export default React.memo(SliderContent);
// export default SliderContent;

/* 
else if (cta1.link_url.startsWith("/api/")) {
                                console.log(cta1.link_url);

                                const link = document.createElement("a");
                                link.href = cta1?.link_url;
                                // Append to html link element page
                                document.body.appendChild(link);
                                // Start download
                                link.click();
                                // Clean up and remove the link
                                link.parentNode.removeChild(link);
                              } 

*/
