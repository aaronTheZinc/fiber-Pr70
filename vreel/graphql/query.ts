import { gql, ApolloError } from "@apollo/client";
import { client } from "./index";
import { User } from "../types";

export const LoginQuery = gql`
  query Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;
const UsernameQuery = gql`
  query User($Username: String) {
    username(username: $Username) {
      id
      first_name
      last_name
      email
    }
  }
`;

export const getUserByUsername = async (username: string): Promise<User> => {
  const { data } = await client.query({
    query: UsernameQuery,
    variables: { Username: username },
  });

  return data.username;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const { data } = await client.query({
      query: LoginQuery,
      variables: { email, password },
    });

    return data.login.token;
  } catch (error) {
    console.error("ERROR WITH LOGIN:", error);
  }
};
