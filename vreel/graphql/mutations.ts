import { gql, useMutation } from "@apollo/client";
import { client } from "./index";
import { User } from "../types";

export const CREATE_USER = gql`
mutation CreateUser(
  $email: String!
  $password: String!
  $username: String!
) {
  register(
    input: {
      email: $email
      password: $password
      username: $username
    }
  ) {
    id
    username
    email
  }
}
`;

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        email,
        password,
        username,
      },
    });
    console.log("reg data", data.register);
    return data;
  } catch (error) {
    console.error("ERROR WITH REGISTER:", error);
  }
};
