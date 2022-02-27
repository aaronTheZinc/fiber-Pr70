import React from "react";

const VreelSlide = (): JSX.Element => {
  return (
    <section
      style={{
        background:
          "url('https://images.unsplash.com/photo-1626715185400-49cccfabc10f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80') no-repeat center center fixed",
        backgroundSize: "cover",
      }}
      className="vreel-slide vreel-slide__wrapper"
    >
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
            src="/background-credit-icon.svg"
            alt="background-credit-icon"
            className="vreel-slide__icon"
          />
        </a>
        <a href="#">
          <img
            src="/background-sound-icon.svg"
            alt="background-sound-icon"
            className="vreel-slide__icon"
          />
        </a>
      </div>
      <aside className="vreel-slide__right-icons__wrapper">
        <div className="top">
          <a href="#">
            <img
              src="/call-icon.svg"
              alt="call-icon"
              className="vreel-slide__icon"
            />
          </a>
          <a href="#">
            <img
              src="/add-to-contact-icon.svg"
              alt="add-to-contact-icon"
              className="vreel-slide__icon"
            />
          </a>
          <a href="#">
            <img
              src="/add-contact-icon.svg"
              alt="add-contact-icon"
              className="vreel-slide__icon"
            />
          </a>
        </div>

        <div className="bottom">
          <a href="#">
            <img
              src="/share-icon.svg"
              alt="share-icon"
              className="vreel-slide__icon"
            />
          </a>
          <a href="#">
            <img
              src="/like-icon.svg"
              alt="like-icon"
              className="vreel-slide__icon"
            />
          </a>
          <a href="#">
            <img
              src="/slide-credit-icon.svg"
              alt="slide-credit-icon"
              className="vreel-slide__icon"
            />
          </a>
          <a href="#">
            <img
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
