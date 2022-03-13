import { gql, useMutation, ApolloError } from "@apollo/client";
import { client } from "./index";
import { User } from "../types";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!) {
    register(
      input: { email: $email, password: $password, username: $username }
    ) {
      id
      username
      email
    }
  }
`;
interface RegistrationResponse {
  error: string;
  user: User;
}
export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<RegistrationResponse> => {
  const response = {} as RegistrationResponse;
  await client
    .mutate({
      mutation: CREATE_USER,
      variables: {
        email,
        password,
        username,
      },
    })
    .then(({ data }) => {
      response.user = data.register;
    })
    .catch((e) => {
      response.error = e.message;
    });
  // console.log('res', response);

  return response;
};
