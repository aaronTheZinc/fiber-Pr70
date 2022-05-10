import { gql, useMutation, ApolloError } from "@apollo/client";
import { client } from "./index";
import { User, SaveSlideType, DeleteSlide } from "../types";

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $username: String!
    $account_type: String!
  ) {
    register(
      input: {
        email: $email
        password: $password
        username: $username
        account_type: $account_type
      }
    ) {
      id
      username
      email
    }
  }
`;
export const CREATE_ENTERPRISE = gql`
  mutation CreateEnterprise(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createEnterprise(
      input: { email: $email, password: $password, name: $name }
    ) {
      id
    }
  }
`;
export const CREATE_SLIDE = gql`
  mutation CreateSlide($token: String!) {
    createSlide(token: $token) {
      id
      author
    }
  }
`;

export const EDIT_SLIDE = gql`
  mutation EditSlide($token: String!, $slideId: String!, $data: String!) {
    updateSlide(token: $token, slideId: $slideId, data: $data) {
      id
    }
  }
`;
export const DELETE_SLIDE = gql`
  mutation EditSlide($token: String!, $slideId: String!) {
    removeSlide(token: $token, slideId: $slideId) {
      succeeded
      message
    }
  }
`;
export const LIKE_SLIDE = gql`
  mutation ($target: String!, $token: String!) {
    likeSlide(input: { target: $target, token: $token }) {
      message
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation employees(
    $token: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
    $accountType: String!
  ) {
    addEmployeeToEnterprise(
      token: $token
      newUser: {
        first_name: $firstName
        last_name: $lastName
        email: $email
        account_type: $accountType
        username: $username
        password: $password
      }
    ) {
      message
    }
  }
`;

interface NewSlide {
  content_type: string;
  uri: string;
  slide_location: number;
}

// export const createSlide = async (token: string, input: NewSlide) => {
//   await client
//     .mutate({
//       mutation: CREATE_SLIDE,
//       variables: {
//         token,
//         input: {
//           content_type: input.content_type,
//           uri: input.uri,
//           slide_location: input.slide_location,
//         },
//       },
//     })
//     .then(({ data }) => {
//       console.log("slide data", data.createSlide);
//       return data.createSlide;
//     })
//     .catch((err) => {
//       console.error("ERROOORRRR with CREATE_SLIDE MUTATION", err);
//     });
// };

interface RegistrationResponse {
  error: string;
  user: User;
}
export const registerUser = async (
  username: string,
  email: string,
  password: string,
  account_type: string
): Promise<RegistrationResponse> => {
  const response = {} as RegistrationResponse;
  await client
    .mutate({
      mutation: CREATE_USER,
      variables: {
        email,
        password,
        username,
        account_type,
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

export const createEnterprise = async (variables): Promise<User> => {
  const { data } = await client.mutate({
    mutation: CREATE_ENTERPRISE,
    variables,
  });
  return data as User;
};

export const addEmployee = async (variables): Promise<User> => {
  const { data, errors } = await client.mutate({
    mutation: CREATE_EMPLOYEE,
    variables,
  });
  return data as User;
};

export const saveSlide = async ({ id, token, slide }: SaveSlideType) => {
  console.log(JSON.stringify(slide));
  await client.mutate({
    mutation: EDIT_SLIDE,
    variables: {
      token,
      slideId: id,
      data: JSON.stringify(slide),
    },
  });
};
export const deleteSlide = async ({ token, slideId }: DeleteSlide) => {
  return await client.mutate({
    mutation: DELETE_SLIDE,
    variables: {
      token,
      slideId,
    },
  });
};

export const createSlide = async (token: string) => {
  return await client.mutate({
    mutation: CREATE_SLIDE,
    variables: {
      token,
    },
  });
};

export const likeSlide = async (token: string, slideId: string) => {
  return await client.mutate({
    mutation: LIKE_SLIDE,
    variables: { token, slideId },
  });
};
