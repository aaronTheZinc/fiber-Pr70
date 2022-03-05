import React, { useState } from "react";

const VreelSlide = (): JSX.Element => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSlideLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleSlideSound = () => {
    setIsMuted(!isMuted);
  };
  return (
    <section className="vreel-slide vreel-slide__wrapper">
      {/* <img src="https://images.unsplash.com/photo-1626715185400-49cccfabc10f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" alt="background img" className="vreel-slide__background-img" /> */}

      <video className="vreel-slide__background-video" autoPlay muted loop>
        <source src="/vreel-vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
        {/* <div className="vreel-slide__background-video__yt">
          <iframe
            width="720"
            height="1280"
            src="https://www.youtube.com/embed/IInzXXJLYoY?autoplay=1&playsinline=1&controls=0&disablekb=1&enablejsapi=1&fs=0&loop=1&muted=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>  */}
     

      <div className="vreel-slide__overlay"></div>

      <div className="vreel-slide__text-wrapper">
        <h1 className="vreel-slide__heading-text">
          THE INTERFACE THAT VISUALLY ELEVATES YOUR BRAND™
        </h1>
        <p className="vreel-slide__text">
          Upload some files in file manager and then use editor to personalize
          your Vreel
        </p>
        <a className="vreel-slide__btn" href="#">
          Link Your Button
        </a>
      </div>

      <img
        src="/down-arrow.png"
        alt="down arrow"
        className="vreel-slide__down-arrow"
      />
      <div className="vreel-slide__left-icons__wrapper">
        <a href="#">
          <img
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Background Credits"
            src="/background-credit-icon.svg"
            alt="background-credit-icon"
            className="vreel-slide__icon"
          />
        </a>
        {isMuted ? (
          <img
            onClick={toggleSlideSound}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Toggle Slide Sound"
            src="/slide-sound-mute-icon.svg"
            alt="slide-sound-mute-icon"
            className="vreel-slide__icon vreel-slide__icon-sound"
          />
        ) : (
          <img
            onClick={toggleSlideSound}
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
          <a href="#">
            <img
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Call Me at 773-445-3322"
              src="/call-icon.svg"
              alt="call-icon"
              className="vreel-slide__icon"
            />
          </a>
          <a href="#">
            <img
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Join My Contact list"
              src="/add-to-contact-icon.svg"
              alt="add-to-contact-icon"
              className="vreel-slide__icon"
            />
          </a>
          <a href="#">
            <img
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Download My Vcard"
              src="/add-contact-icon.svg"
              alt="add-contact-icon"
              className="vreel-slide__icon"
            />
          </a>
        </div>

        <div className="bottom">
          <a href="#">
            <img
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Share My Vreel"
              src="/share-icon.svg"
              alt="share-icon"
              className="vreel-slide__icon"
            />
          </a>
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

          <a href="#">
            <img
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Slide Credits"
              src="/slide-credit-icon.svg"
              alt="slide-credit-icon"
              className="vreel-slide__icon"
            />
          </a>
          <a href="#">
            <img
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Scan My QR Code"
              src="/qr-icon.svg"
              alt="qr-icon"
              className="vreel-slide__icon"
            />
          </a>
        </div>
      </aside>
    </section>
  );
};

export default VreelSlide;
