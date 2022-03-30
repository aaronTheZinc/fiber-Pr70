import Head from "next/head";
import Links from "../components/Elements/Links/Links";
import Services from "../components/Elements/Services/Services";
import Social from "../components/Elements/Social/Social";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";

export default function Home({  isMobile }) {
  return (

    <div>
      <Head>
        <title>VReel Homepage</title>
      </Head>
      <VreelSlider />
      <Links />
      <Social />
      <Services isMobile={isMobile} />
      <TextArea />
    </div>
  )
}
