import { AccMenuAction, NavMenuAction } from 'src/redux/actions/actions';
import type { RightSidebar } from '../../types';

export const rightSidebar: RightSidebar = {
  topIcons: [
    {
      src: '/assets/icons/icon-menu.svg',
      alt: 'Menu Icon',
      method: function (dispatch: Function) {; 
        dispatch(NavMenuAction());
      },
    },
    {
      src: '/assets/icons/icon-follow.svg',
      alt: 'Follow Icon',
      method: function (message) {
        console.log(message);
      },
    },
    {
      src: '/assets/icons/icon-address.svg',
      alt: 'V-Card Icon',
      method: function (dispatch: Function) {
        dispatch(AccMenuAction());
      },
    },

    // {
    //   src: '/assets/call-icon.svg',
    //   alt: 'Call Icon',
    //   method: function (message) {
    //     console.log(message);
    //   },
    // },
  ],
  bottomIcons: [
    {
      src: '/assets/icons/icon-info.svg',
      alt: 'Info Icon',
      method: function (message) {
        console.log(message);
      },
    },
    {
      src: '/assets/icons/icon-heart-filled.svg',
      alt: 'like Icon',
      method: function (message) {
        console.log(message);
      },
    },
    {
      src: '/assets/icons/icon-share.svg',
      alt: 'Share Icon',
      method: function (message) {
        console.log(message);
      },
    },
    {
      src: '/assets/icons/icon-qr.svg',
      alt: 'QR Icon',
      method: function (message) {
        console.log(message);
      },
    },
  ],
};
