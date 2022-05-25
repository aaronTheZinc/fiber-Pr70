import React, { useEffect, useRef, useState } from 'react';
import type { VreelSlideProps } from '../../types';
import { rightSidebar } from './SlideData';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../redux/store/store';
import { AccMenuAction } from '../../redux/actions/actions';
import UserProfile from '../common/UserProfile';

const VreelSlide = ({
  swiper,
  currentSlide,
  slide,
  slideId,
}: VreelSlideProps): JSX.Element => {
  const [mute, setMute] = useState<boolean>(true);

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className='relative '>
      {/* <img
        className='absolute top-0 left-0 h-full w-full object-cover object-top '
        src={img.src}
        alt={img.alt}
      /> */}

      {/* USER PROFILE */}
      <UserProfile className='absolute top-6 lg:top-8 right-20 lg:right-28 z-20' />

      <div className='bg-black/60 px-4  lg:px-12 py-6 lg:py-8 relative z-10 h-screen'>
        <div className='h-full flex'>
          {/* LEFT SIDEBAR */}
          <div className='h-full flex flex-col justify-end w-max '>
            <div className='flex flex-col space-y-4'>
              {/*     <button>
                <img
                  src='/assets/background-credit-icon.svg'
                  alt='Credit Icon'
                />
              </button> */}
              <button onClick={() => setMute(!mute)}>
                <img
                  className='h-20 object-cover'
                  src={`/assets/${
                    mute
                      ? 'slide-sound-mute-icon-2.svg'
                      : 'slide-sound-icon-2.svg'
                  }`}
                  alt='Mute Icon'
                />
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className='px-2  flex-1  flex items-end justify-center mb-6 lg:mb-12 '>
            <div className='text-center '>
              <h3 className='text-base lg:text-2xl text-white font-bold '>
                VREEL™
              </h3>
              <p className='text-sm lg:text-xl text-white'>
                We make you look better! Our Web 3.0 storytelling interface
                visually elevates your brand.{' '}
              </p>

              <div className='flex justify-center  items-center space-x-2 lg:space-x-10'>
                <button
                  className='btn-slide w-24  lg:w-40 py-3'
                  onClick={() => router.push('/login')}
                >
                  Log in
                </button>
                <button
                  className='btn-slide w-24 lg:w-40 py-3'
                  onClick={() => router.push('/register')}
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className='w-max flex flex-col justify-between items-end '>
            <div className=' flex flex-col items-center space-y-4'>
              {rightSidebar.topIcons.map((icon, index) => (
                <button key={index} onClick={() => icon.method(dispatch)}>
                  <img
                    className={`w-8 object-cover ${icon?.className}`}
                    src={icon.src}
                    alt={icon.alt}
                  />
                </button>
              ))}
            </div>

            <div className=' flex flex-col items-center space-y-4'>
              {rightSidebar.bottomIcons.map((icon, index) => (
                <button key={index} onClick={() => icon.method()}>
                  <img
                    className={`w-8 object-cover ${icon?.className}`}
                    src={icon.src}
                    alt={icon.alt}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO PLAYER */}
      <ReactPlayer
        playing={true}
        muted={mute}
        url={slide.src}
        playsinline={true}
        config={{
          file: {
            attributes: {
              autoPlay: true,
              playsInline: true,
              muted: mute,
              type: 'video/mp4',
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -2,
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default VreelSlide;
