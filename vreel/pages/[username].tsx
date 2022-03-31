import Head from "next/head";
import { useRouter } from "next/router";
import Links from "../components/Elements/Links/Links";
import Services from "../components/Elements/Services/Services";
import Social from "../components/Elements/Social/Social";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";
import { getAllUsernames, getUserByUsername } from "../graphql/query";

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
        <title>{`${username}'s`} VReel</title>
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
  try {
    const { usernames } = await getAllUsernames();
    console.log("running")
    const paths = usernames.map((username) => {
      console.log(`username ${username}`)

      return { params: { username } }
    });

    return { paths, fallback: false };
  } catch (error) {
    console.error("ERRORRRR in [username] getStaticPaths", error);
  }
}

export async function getStaticProps({ params }) {
  try {

    const user = await getUserByUsername(params.username);
    console.log("[user]", user)
    if (!user) {
      return {
        notFound: true,
      }
    }
    return { props: { user } };
  } catch (error) {
    console.error("ERRORRRR in [username] getStaticProps", error);
  }
}
