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
export const CREATE_SLIDE = gql`
  mutation CreateSlide($token: String!, $input: NewSlide!) {
    createSlide(token: $token, input: $input) {
      author
    }
  }
`;

interface NewSlide {
  content_type: string;
  uri: string;
  slide_location: number;
}

export const createSlide = async (token: string, input: NewSlide) => {
  await client
    .mutate({
      mutation: CREATE_SLIDE,
      variables: {
        token,
        input: {
          content_type: input.content_type,
          uri: input.uri,
          slide_location: input.slide_location,
        },
      },
    })
    .then(({ data }) => {
      // console.log("slide data", data.createSlide);
      return data.createSlide;
    })
    .catch((err) => {
      console.error("ERROOORRRR with CREATE_SLIDE MUTATION", err);
    });
};

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
