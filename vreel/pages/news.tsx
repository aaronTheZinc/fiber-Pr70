import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
interface NewsPageProps {
  slides: Slide;
  isAuth: boolean;
}
import { useRouter } from "next/router";
import { Slide } from "../types";
export default function News({ slides, isAuth }: NewsPageProps): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, []);
  return <div>News!</div>;
}

export const getServerSideProps: GetServerSideProps<NewsPageProps> =
  async function ({ params, req }): Promise<any> {
    console.log("[cookies]", req.cookies);
    return {
      props: {
        slides: [],
        isAuth: true,
      },
    };
  };
