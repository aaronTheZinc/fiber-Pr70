import React, { FunctionComponent } from 'react';

export interface Icons {
  src: string;
  alt: string;
  className?: string;
  method?: Function;
}

export interface RightSidebar {
  topIcons: Array<Icons>;
  bottomIcons: Array<Icons>;
}

export interface VreelSlideProps {
  swiper: any;
  slideId: any;
  slide: {
    src: string;
    alt: string;
  };
  currentSlide: number;
}

export interface DashboardItem {
  title: string;
  href: string;
  children?: Array<{
    title: string;
    href: string;
    method?: Function;
  }>;
  method?: Function;
}

export interface DashboardComponent {
  title: string;
  component: any;
}
