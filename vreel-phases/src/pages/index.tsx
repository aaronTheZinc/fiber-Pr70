import Section from "@sections/Section";
import HeroSlide from "@sections/Sliders/HeroSlider/HeroSlide/HeroSlide";
import HeroSlider from "@sections/Sliders/HeroSlider/HeroSlider";
import { GetServerSideProps } from "next";
import { useState } from "react";

import Sections from "src/components/Sections/Sections";

export const vreel = {
  author: "can7os223akuve30qlgg",
  elements: {
    socials: {
      header: "",
      position: 5,
      socials: [
        {
          platform: "twitter",
          username: "vreel",
        },
      ],
    },
    videos: {
      header: "",
      position: 3,
      videos: [
        "/assets/videos/waterfall.mp4",
        "/assets/videos/test-video-1.mp4",
        "/assets/videos/test-video-2.mp4",
        /*    "/assets/videos/test-video-3.mp4",
        "/assets/videos/test-video-4.mp4",
        "/assets/videos/test-video-5.mp4",
        "/assets/videos/test-video-6.mp4",
        "/assets/videos/waterfall2.mp4",
        "/assets/videos/test-video-7.mp4",
        "/assets/videos/vreel-vid.mp4", */
      ].map((e) => {
        return {
          mobile: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: e,
            content_type: "video",
          },
          desktop: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: e,
            content_type: "video",
          },
          cta1: {
            link_header: "Sign Up Sign Up",
            link_type: "URL",
            link_url: "/register",
          },
          cta2: {
            link_header: "Login",
            link_type: "URL",
            link_url: "/login",
          },
        };
      }),
    },
    gallery: {
      header: "",
      position: 4,
      images: [1, 2, 3, 4, 5, 6].map((e) => {
        return {
          mobile: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/images/test-image (${e}).jpg`,
            content_type: "image",
          },
          desktop: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/images/test-image (${e}).jpg`,
            content_type: "image",
          },
          cta1: {
            link_header: "Sign Up",
            link_type: "",
            link_url: "/register",
          },
          cta2: {
            link_header: "Login",
            link_type: "",
            link_url: "/login",
          },
        };
      }),
      hidden: false,
    },
    simple_links: {
      header: "",
      position: 1,
      links: [
        {
          id: "candi5i23akkasd8kg6g",
          thumbnail:
            "https://staging.vreel.page/files/6dbd0edfdc7e4cfd8c36d32d6401da92",
          link_header: "Black Embition prize",
          url: "https://staging.vreel.page/files/6dbd0edfdc7e4cfd8c36d32d6401da92",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candjpa23akkasd8kg70",
          thumbnail:
            "https://staging.vreel.page/files/364fb06406188a4d0d0a9b28af83ebef",
          link_header: "Black Embition prize 2",
          url: "https://staging.vreel.page/files/364fb06406188a4d0d0a9b28af83ebef",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candmoq23akkasd8kg7g",
          thumbnail:
            "https://staging.vreel.page/files/7453964216168b85c8c64a5f9b6990f5",
          link_header: "Black Embition prize 2",
          url: "https://staging.vreel.page/files/7453964216168b85c8c64a5f9b6990f5",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candn1a23akkasd8kg80",
          thumbnail:
            "https://staging.vreel.page/files/1b0f235025c5c3b4fdf9b1d0a43a1733",
          link_header: "Black Embition prize 4",
          url: "https://staging.vreel.page/files/1b0f235025c5c3b4fdf9b1d0a43a1733",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candn9q23akkasd8kg8g",
          thumbnail:
            "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_header: "Black Embition 5",
          url: "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candnba23akkasd8kg90",
          thumbnail:
            "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_header: "Black Embition 6",
          url: "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_type: "url",
          tag: "shop",
        },
      ],
    },
  },
  slides: [
    // {
    //   url: "https://vreel-page.s3.amazonaws.com/Exquisite+Gucci.mp4",
    //   content_type: "video",
    // },
    // {
    //   url: "https://vreel-page.s3.amazonaws.com/Gucci+Resort+Collection-1080p.mp4",
    //   content_type: "video",
    // },
    // {
    //   url: "https://vreel-page.s3.amazonaws.com/Gucci+x+Adidas.mp4",
    //   content_type: "video",
    // },
    // {
    //   url: "https://vreel-page.s3.amazonaws.com/The+Gucci+Lovelight+Collection-1080p.mp4",
    //   content_type: "video",
    // },
    // {
    //   url: "https://vreel-page.s3.amazonaws.com/The+Gucci+Pet+Collection-1080p.mp4",
    //   content_type: "video",
    // },
    // {
    //   url: "https://vreel-page.s3.amazonaws.com/Gucci+Resort+Collection-1080p+(1).mp4",
    //   content_type: "video",
    // },
    // {
    //   url: "https://vreel.page/users/avangardinnovative/videos/aiexplainer_optimized.mp4",
    //   content_type: "video",
    // },
    // {
    //   url: "https://staging.vreel.page/files/04923aaa9dbb37bd49b050bde398ecec",
    //   content_type: "video/mp4",
    // },
    {
      url: "https://shaktisinghcheema.com/wp-content/uploads/2019/10/Laptop-63.mp4",
      content_type: "video/mp4",
    },
    {
      url: "https://res.cloudinary.com/klwebco/video/upload/v1656836002/samples/test-video-5_m2wxg1.mp4",
      content_type: "video/mp4",
    },

    {
      url: "https://res.cloudinary.com/klwebco/video/upload/v1656835997/samples/test-video-1_edlvu6.mp4",
      content_type: "video/mp4",
    },
    {
      url: "https://res.cloudinary.com/klwebco/video/upload/v1656835999/samples/test-video-2_sjox9x.mp4",
      content_type: "video/mp4",
    },
    {
      url: "https://res.cloudinary.com/klwebco/image/upload/v1655998234/test-image_1_nhb5cc.jpg",
      content_type: "image/jpeg",
    },
    {
      url: "https://res.cloudinary.com/klwebco/image/upload/v1645686802/samples/bike.jpg",
      content_type: "image/jpeg",
    },
    // {
    //   url: "https://res.cloudinary.com/klwebco/image/upload/v1645686800/samples/sheep.jpg",
    //   content_type: "image",
    // },

    // "https://res.cloudinary.com/klwebco/video/upload/v1645686813/samples/elephants.mp4",
    // "https://res.cloudinary.com/klwebco/video/upload/v1645686813/samples/elephants.mp4",
    // "/assets/videos/test-video-1.mp4",
    /*     "/assets/videos/test-video-2.mp4",
    "/assets/videos/test-video-3.mp4",
    "/assets/videos/test-video-4.mp4",
    "https://res.cloudinary.com/klwebco/video/upload/v1645686811/samples/sea-turtle.mp4",
    "/assets/videos/test-video-5.mp4",
    "/assets/videos/test-video-6.mp4",
    "/assets/videos/waterfall2.mp4",
    "/assets/videos/test-video-7.mp4",
    "/assets/videos/vreel-vid.mp4", */
  ].map((e, index) => {
    return {
      id: e.url,
      slide_location: index,
      content_type: "",
      uri: "",
      title: {
        header: "VREEL???",
        description:
          "We make you look better! Our Web3 interface curates and displays your story amazingly.",
      },
      advanced: {
        header:
          "We make you look better! Our Web3 interface curates and displays your story amazingly.",
      },
      mobile: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri:
          index == 3
            ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
            : "",
        uri: e.url,
        content_type: e.content_type,
      },
      desktop: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri:
          index == 1
            ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            : "",
        uri: e.url,
        content_type: e.content_type,
      },
      cta1: {
        link_header: "Sign Up",
        link_type: "",
        link_url: "/register",
      },
      cta2: {
        link_header: "Login",
        link_type: "",
        link_url: "/login",
      },
    };
  }),
};
export default function Home({ data }) {
  // const router = useRouter();
  // const [currentSlide, setCurrentSlide] = useState(null);
  // const { username } = router?.query;
  // const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
  //   variables: {
  //     username: "/",
  //   },
  // });
  /* const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: { username: "sagor" },
  });

  if (loading) {
    return <Loader />;
  }

  data?.username?.vreel?.slides.map((D) => {
    console.log(D.desktop);
  });
  
 */
  const [swiper, setSwiper] = useState(null);

  // console.log({ vreel: vreel.slides });

  // return <HeroSlider slides={vreel.slides} view='Mobile' />;
  return <Sections vreel={vreel} />;
}
