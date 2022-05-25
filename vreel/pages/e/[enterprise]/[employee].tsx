import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { VreelSlider } from "../../../components/VreelSlider/VreelSlider";
import {
  getEnterpriseEmployee,
  getServerAnalytics,
} from "../../../graphql/query";

export default function Employee({ employee, enterpriseName }): JSX.Element {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <VreelSlider
        username={enterpriseName}
        data={false}
        isUser={true}
        user={employee.employee}
      />
      {/* <Links />
      <Social isUser={true} user={user} username={username?.toString()} />
      <TextArea />
      <Services isMobile={isMobile} /> */}
    </div>
  );
}
type RouteBlob = {
  enterprise: string;
  employee: string;
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // consol
  try {
    const { enterprise, employee: employeeId } = params;
    const employee = await getEnterpriseEmployee(
      enterprise as string,
      employeeId as string
    );
    console.log("[returned employee]: ", employee);
    if (!employee) {
      throw new Error("failed to load employee");
    }
    return {
      props: {
        employee,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
};
