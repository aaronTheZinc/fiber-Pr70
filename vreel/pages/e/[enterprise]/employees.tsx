import React from "react";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { User } from "../../../types";
interface EmployeesPageProps {
  employees: User[];
}
export default function Employees({}) {
  return <div></div>;
}

// export const getServerSideProps: GetServerSideProps = async({ req }): Promise<GetServerSidePropsResult<EmployeesPageProps>> => {
//     const { cookies } = req;

//     // const employees = await
//     return {
//         props: {
//             employees:
//         }
//     }
// }
