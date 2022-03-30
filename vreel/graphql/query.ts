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

const UserQuery = gql`
  query User($Id: String) {
    user(id: $Id) {
      id
      username
      email
      vreel {
        author
        slides {
          id
          slide_location
          content_type
          uri
        }
      }
    }
  }
`;

const UsernameQuery = gql`
  query User($Username: String) {
    username(username: $Username) {
      id
      email
      username
      vreel {
        author
        slides {
          id
          slide_location
          content_type
          uri
        }
      }
    }
  }
`;

const GetUsernamesQuery = gql`
  query ServerAnalytics {
    serverAnalytics {
      usernames
    }
  }
`;
const GetUserByEmailQuery = gql`
  query Email ($Email: String!) {
    email (email: $Email) {
      id
      email
      username
      vreel {
        author
        slides {
          id
          slide_location
          content_type
          uri
        }
      }
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
export const getUserByEmail = async (email: string): Promise<User> => {
  const { data } = await client.query({
    query: GetUserByEmailQuery,
    variables: { Email: email },
  });

  return data.email;
};

interface ServerAnalytics {
  usernames: [string];
}

export const getAllUsernames = async (): Promise<ServerAnalytics> => {
  const response = {} as ServerAnalytics;

  await client
    .query({
      query: GetUsernamesQuery,
    })
    .then(({ data }) => {
      response.usernames = data.serverAnalytics.usernames;
    })
    .catch((e) => {
      console.error("ERROR WITH GET ALL USERNAMES QUERY", e.message);
    });

  return response;
};

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await client.query({
    query: UserQuery,
    variables: { Id: id },
  });

  return data.user;
};

interface LoginResponse {
  error: string;
  token: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = {} as LoginResponse;

  await client
    .query({
      query: LoginQuery,
      variables: { email, password },
    })
    .then(({ data }) => {
      response.token = data.login.token;
      response.id = data.login.id;
    })
    .catch((e) => {
      response.error = e.message;
    });

  return response;
};
