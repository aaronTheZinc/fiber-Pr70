import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Slide, User } from "../types";
import { getNewsFeedByToken, getUserByToken } from "../graphql/query";
import { VreelSlider } from "../components/VreelSlider/VreelSlider";
interface NewsPageProps {
  slides: Slide;
  user: User;
  isAuth: boolean;
}
export default function News({ isAuth, user }: NewsPageProps): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
    console.log("user ->", user);
  }, []);
  return (
    <div>
      <VreelSlider username={"f"} data={false} isUser={true} user={user} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<NewsPageProps> = async ({
  params,
  req,
}): Promise<any> => {
  const token = req.cookies["userAuthToken"];
  const user = await getNewsFeedByToken(token);
  console.log("[cookies]", req.cookies);
  return {
    props: {
      isAuth: user && token,
      user: { vreel: { slides: user.news } },
    },
  };
};
