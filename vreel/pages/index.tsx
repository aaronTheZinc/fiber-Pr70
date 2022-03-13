import Services from "../components/Elements/Services/Services";
import Social from "../components/Elements/Social/Social";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";

export default function Home() {
  return (

    <div>
      <VreelSlider />
      <Social />
      <TextArea />
      <Services />
    </div>
  )
}
