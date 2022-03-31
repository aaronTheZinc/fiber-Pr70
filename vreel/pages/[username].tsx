import Head from "next/head";
import { useRouter } from "next/router";
import Links from "../components/Elements/Links/Links";
import Services from "../components/Elements/Services/Services";
import Social from "../components/Elements/Social/Social";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";
import { getAllUsernames } from "../graphql/query";

const Username = ({ user, isMobile }) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Head>
        <title>{username}'s VReel</title>
      </Head>
      <VreelSlider isUser={true} user={user} username={username} />
      <Links />
      <Social isUser={true} user={user} username={username} />
      <TextArea />
      <Services isMobile={isMobile} />
    </div>
  );
};

export default Username;

export async function getStaticPaths() {
  const { usernames } = await getAllUsernames();

  const paths = usernames.map((username) => ({
    params: { username },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const router = useRouter()

  const { username } = router.query;
  
  const res = await fetch(`https://dev1.vreel.page/api/${username}`);
  const { user } = await res.json();
  return { props: { user } };
}
