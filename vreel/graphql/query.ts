import { gql, ApolloError } from "@apollo/client";
import { client } from "./index";
import { User } from "../types";

//Fetch Profile

// const UsernameQuery = gql`
//     query($id: String!) [
//         username(id: $id) {
//             first_name
//             last_name
//             email
//         }
//     ]
// `;

export const LoginQuery = gql`
  query Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

// export const GetUserProfile = async (
//   id: string
// ): Promise<User | ApolloError> => {
//   const { data, error } = await client.query({
//     query: UsernameQuery,
//     variables: { id: id },
//   });
//   if (error) {
//     return error;
//   } else {
//     return data;
//   }
// };
