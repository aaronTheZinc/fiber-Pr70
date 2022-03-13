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
  EmailIcon
} from "react-share";
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { PrimaryButton } from "../Button/Button";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";

interface ModalProps {
  btnTitle: string;
  popUpText: string;
  elClassName: string;
  username: string;
  icon: string;
  origin: string;
  isQr: boolean;
  isSocial: boolean;
}

export const VreelModal = ({
  isQr,
  icon,
  isSocial,
}: ModalProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { username } = router.query;

  useEffect(() => {
  }, []);

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
        {isQr && (
          <>
            <button
              className="btn-close vreel-modal__close-btn"
              aria-label="Close"
              onClick={() => setOpen(!open)}
            ></button>
            <QRCode
              style={{ margin: "0 auto", marginBottom: "25px" }}
              size={280}
              value={`http://localhost:3000/${username}`}
            />
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
              <EmailIcon size={32} round />
            </EmailShareButton>
              <FacebookShareButton
            
              url={"https://facebook.com"}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#hashtag"}
              description={"kgjhwregkjrwghklrjehgljwlrg"}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
            
              url={"https://facebook.com"}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#hashtag"}
              description={"kgjhwregkjrwghklrjehgljwlrg"}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton
            
              url={"https://facebook.com"}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#hashtag"}
              description={"kgjhwregkjrwghklrjehgljwlrg"}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <PinterestShareButton
            
              url={"https://facebook.com"}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#hashtag"}
              description={"kgjhwregkjrwghklrjehgljwlrg"}
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
            <RedditShareButton
            
              url={"https://facebook.com"}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#hashtag"}
              description={"kgjhwregkjrwghklrjehgljwlrg"}
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
            
            </div>
            
          </>
        )}

        {!isQr && !isSocial && (
          <>
            <ModalHeader toggle={() => setOpen(!open)}>
              {" "}
              Modal title
            </ModalHeader>
            <ModalBody>Modal body text goes here.</ModalBody>
          </>
        )}
      </Modal>
    </div>
  );
};
