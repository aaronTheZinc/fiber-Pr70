import { gql, useMutation } from "@apollo/client";
import { client } from "./index";
import { User } from "../types";

export const CREATE_USER = gql`
  mutation CreateUser($first_name: String!, $last_name: String!, $email: String, $phone_number: String!, $password: String!, $business_address: String!, $billing_address: String!, $website: String!, $job_title: String!, $username: String!) {
    register(
      input: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        phone_number: $phone_number
        password: $password
        business_address: $business_address
        billing_address: $billing_address
        website: $website
        job_title: $job_title
        username: $username
      }
    ) {
      id
      first_name
      last_name
      email
    }
  }
`;

export const registerUser = async (
  first_name: string,
  last_name: string,
  phone_number: string,
  business_address: string,
  billing_address: string,
  website: string,
  job_title: string,
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
        first_name,
        last_name,
        phone_number,
        business_address,
        billing_address,
        website,
        job_title,
        username,
      },
    });
    console.log("reg data", data);
    return data;
  } catch (error) {
    console.error("ERROR WITH REGISTER:", error);
  }
};
