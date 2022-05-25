import Head from "next/head";
import Links from "../components/Elements/Links/Links";
import Services from "../components/Elements/Services/Services";
import Social from "../components/Elements/Social/Social";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";
import { createClient } from "pexels";

export default function Home({ isMobile, data }) {
  return (
    <div>
      <Head>
        <title>VReel Homepage</title>
      </Head>
      <VreelSlider isUser={false} data={data.videos} />
      <Links />
      {/* <Links />
      <Social />
      <Services isMobile={isMobile} />
      <TextArea /> */}
    </div>
  );
}
const envType = process.env.NEXT_PUBLIC_ENVIRONMENT;

let BASE_URL = "";
const current_env = process.env.ENVIRONMENT;
if (current_env === "dev") {
  BASE_URL = "http://localhost:3000";
} else if (current_env === "staging") {
  BASE_URL = "https://staging.vreel.page";
} else {
  BASE_URL = "https://dev1.vreel.page";
}
export async function getStaticProps() {
  // const res = await fetch(`${BASE_URL}/api/pexels`);
  // const data = await res.json();
  // console.log("videos", data);
  // const client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);

  // const videos = await client.videos.search({
  //   query: "waterfalls",
  //   per_page: 4,
  // });

  return {
    props: { data: [] },
  };
}
