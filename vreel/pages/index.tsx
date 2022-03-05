import Services from "../components/Elements/Services/Services";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";

export default function Home() {
  return (

    <div>
      <VreelSlider />
      <TextArea />
      <Services />
    </div>
  )
}
