import { useRouter } from "next/router";
import Services from "../components/Elements/Services/Services";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";
import { getAllUsernames } from "../graphql/query";

const Username = ({ user }) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <VreelSlider isUser={true} user={user} username={username} />
      <TextArea />
      <Services />
    </div>
  );
};

export default Username;

export async function getStaticPaths() {
  const { usernames } = await getAllUsernames()
 
  const paths = usernames.map((username) => ({
    params: { username },
  })) 
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.DEV_URL}/api/${params.username}`);
  const { user } = await res.json();
  return { props: { user } }
}