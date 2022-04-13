import Head from "next/head";
import Links from "../components/Elements/Links/Links";
import Services from "../components/Elements/Services/Services";
import Social from "../components/Elements/Social/Social";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";

export default function Home({ isMobile, data }) {
  return (
    <div>
      <Head>
        <title>VReel Homepage</title>
      </Head>
      <VreelSlider data={data.videos} />
      <Links />
      <Social />
      <Services isMobile={isMobile} />
      <TextArea />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/pexels");
  const data = await res.json();
  console.log("videos", data);
  return {
    props: { data },
  };
}
