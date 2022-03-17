import React, { useRef } from "react";
import { SocialIcon } from "react-social-icons";

const Social = ({ isUser, username, user }): JSX.Element => {
  return (
    <div className="vreel-social vreel-social__wrapper">
      {isUser ? (
        <>
          <h1>
            {username && username[0].toUpperCase() + username.slice(1) + "'s"}{" "}
            Social Links
          </h1>
          <ul style={{ gap: '30px', marginTop: '25px' }} className="d-flex flex-row flex-wrap align-items-center justify-content-center">
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://facebook.com" target='_blank' fgColor="#fff"/>
            </li>
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://instagram.com" target='_blank' fgColor="#fff" />
            </li>
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://twitter.com" target='_blank' fgColor="#fff" />
            </li>
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://tiktok.com" target='_blank' fgColor="#fff"/>
            </li>
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://linkedin.com" target='_blank' fgColor="#fff"/>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h1>Social Links</h1>
          <ul style={{ gap: '30px', marginTop: '25px' }} className="d-flex flex-row flex-wrap align-items-center justify-content-center">
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://facebook.com" target='_blank' fgColor="#fff"/>
            </li>
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://instagram.com" target='_blank' fgColor="#fff"/>
            </li>
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://twitter.com" target='_blank' fgColor="#fff"/>
            </li>
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://tiktok.com" target='_blank' fgColor="#fff"/>
            </li>
            <li style={{ border: '.1px solid rgba(255,255,255,.5)', borderRadius: '50%' }}>
              <SocialIcon style={{ height: 95, width: 95 }} url="https://linkedin.com" target='_blank' fgColor="#fff"/>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Social;
