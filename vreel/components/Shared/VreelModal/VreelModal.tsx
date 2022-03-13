import React, { useRef, useEffect, useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { PrimaryButton } from "../Button/Button";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";
import AddToContact from "../../Elements/AddToContact/AddToContact";

interface ModalProps {
  btnTitle: string;
  popUpText: string;
  elClassName: string;
  username: string;
  icon: string;
  origin: string;
  isQr: boolean;
  isSocial: boolean;
  isContact: boolean;
}

export const VreelModal = ({
  isQr,
  icon,
  isSocial,
  isContact,
}: ModalProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { username } = router.query;

  const capitilizedUsername = username ? username[0].toUpperCase() + username.slice(1) : null

  useEffect(() => {}, []);

  const onClick = () => {};
  return (
    <div>
      {icon && (
        <img
          onClick={() => setOpen(!open)}
          src={icon}
          alt="slide-icon"
          className="vreel-slide__icon"
        />
      )}
      <Modal
        className="vreel-modal vreel-modal__wrapper"
        isOpen={open}
        toggle={() => setOpen(!open)}
      >
        {isContact && (
          <>
            <button
              className="btn-close vreel-modal__close-btn"
              aria-label="Close"
              onClick={() => setOpen(!open)}
            ></button>
            <ModalBody>
              <AddToContact />
            </ModalBody>
          </>
        )}
        {isQr && (
          <>
            <button
              className="btn-close vreel-modal__close-btn"
              aria-label="Close"
              onClick={() => setOpen(!open)}
            ></button>
            <ModalBody>
              <h1>Scan {capitilizedUsername && capitilizedUsername + "'s"} QR Code</h1>
              <QRCode
                style={{ alignSelf:'center', margin: "25px 0px" }}
                size={280}
                value={username ? `http://localhost:3000/${username}` : 'https://vreel.page'}
              />
            </ModalBody>
          </>
        )}
        {isSocial && (
          <>
            <button
              className="btn-close vreel-modal__close-btn"
              aria-label="Close"
              onClick={() => setOpen(!open)}
            ></button>
            <div className="d-flex flex-row flex-wrap m-auto">
              <EmailShareButton
                url={"https://facebook.com"}
                quote={"フェイスブックはタイトルが付けれるようです"}
                hashtag={"#hashtag"}
                description={"kgjhwregkjrwghklrjehgljwlrg"}
              >
                <EmailIcon size={50} round />
              </EmailShareButton>
              <FacebookShareButton
                url={"https://facebook.com"}
                quote={"フェイスブックはタイトルが付けれるようです"}
                hashtag={"#hashtag"}
                description={"kgjhwregkjrwghklrjehgljwlrg"}
              >
                <FacebookIcon size={50} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={"https://facebook.com"}
                quote={"フェイスブックはタイトルが付けれるようです"}
                hashtag={"#hashtag"}
                description={"kgjhwregkjrwghklrjehgljwlrg"}
              >
                <TwitterIcon size={50} round />
              </TwitterShareButton>
              <LinkedinShareButton
                url={"https://facebook.com"}
                quote={"フェイスブックはタイトルが付けれるようです"}
                hashtag={"#hashtag"}
                description={"kgjhwregkjrwghklrjehgljwlrg"}
              >
                <LinkedinIcon size={50} round />
              </LinkedinShareButton>
              <PinterestShareButton
                url={"https://facebook.com"}
                quote={"フェイスブックはタイトルが付けれるようです"}
                hashtag={"#hashtag"}
                description={"kgjhwregkjrwghklrjehgljwlrg"}
              >
                <PinterestIcon size={50} round />
              </PinterestShareButton>
              <RedditShareButton
                url={"https://facebook.com"}
                quote={"フェイスブックはタイトルが付けれるようです"}
                hashtag={"#hashtag"}
                description={"kgjhwregkjrwghklrjehgljwlrg"}
              >
                <RedditIcon size={50} round />
              </RedditShareButton>
            </div>
          </>
        )}

        {!isQr && !isSocial && !isContact && (
          <>
            <button
              className="btn-close vreel-modal__close-btn"
              aria-label="Close"
              onClick={() => setOpen(!open)}
            ></button>
            <ModalBody>
              <h1> Heading Text</h1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </ModalBody>
          </>
        )}
      </Modal>
    </div>
  );
};
