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

const GetServerAnalyticsQuery = gql`
  query ServerAnalytics {
    serverAnalytics {
      usernames
      enterprises {
        name
        employees {
          id
        }
    }
    }
  }
`;
export const GetEnterpisesQuery = gql` 
 query ServerAnalytics {
  serverAnalytics {
    usernames
  }
}
  `
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

const GetEnterpriseEmployee = gql`
  query EnterpriseEmployee($EnterpriseName: String!, $EmployeeId: String!) {
    enterpiseEmployee(enterpriseName:$EnterpriseName, employeeId: $EmployeeId) {
      employee {
        id
      }
      vreel {
        author
      }
    }
  }
  `
export const getEnterpriseEmployee = async (EnterpriseName: string, EmployeeId: string) => {
  const { data, errors } = await client.query({
    query: GetEnterpriseEmployee,
    variables: { EnterpriseName, EmployeeId }
  });
  return data
}
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
  enterprises: [{
    name: string;
    employees: {
      id: string
    }[]
  }]
}

export const getServerAnalytics = async (): Promise<ServerAnalytics> => {
  let response = {}

  await client
    .query({
      query: GetServerAnalyticsQuery,
    })
    .then(({ data: { serverAnalytics: data } }) => {
      response = data
    })
    .catch((e) => {
      console.error("[server analytics error]", e.message);
    });

  return response as ServerAnalytics;
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
  id: string;
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
