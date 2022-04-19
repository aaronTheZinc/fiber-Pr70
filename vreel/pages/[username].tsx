import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Links from "../components/Elements/Links/Links";
import Services from "../components/Elements/Services/Services";
import Social from "../components/Elements/Social/Social";
import TextArea from "../components/Elements/TextArea/TextArea";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";
import { getServerAnalytics, getUserByUsername } from "../graphql/query";
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
      <VreelSlider
        username={username?.toString()}
        data={false}
        isUser={true}
        user={user}
      />
      <Links />
      <Social isUser={true} user={user} username={username?.toString()} />
      <TextArea />
      <Services isMobile={isMobile} />
    </div>
  );
};

export default Username;

export async function getStaticPaths() {
  try {
    let { usernames } = await getServerAnalytics();
    console.log("running");
    if (!usernames) {
      usernames = [""];
    }
    const paths = usernames.map((username) => {
      console.log(`username ${username}`);
      if (username == "") {
        username = "--";
      }
      return { params: { username } };
    });
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("ERRORRRR in [username] getStaticPaths", error);
  }
}

export async function getStaticProps({ params }) {
  try {
    const user = await getUserByUsername(params.username);

    return { props: { user } };
  } catch (error) {
    console.log("[failed user query!! ]", error);
    return { notFound: true };
  }
}
