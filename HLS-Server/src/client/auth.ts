import axios from "axios";
import { AuthResponse } from "../types";

import { ServerEndpoint } from "../config";

export const authorizeToken = async (token: string): Promise<AuthResponse> => {
  const { data } = await axios.get(
    `${ServerEndpoint}/auth/authorize?token${token}`
  );
  return data as AuthResponse;
};
