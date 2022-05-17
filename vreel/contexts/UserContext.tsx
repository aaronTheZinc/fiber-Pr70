import { createContext, useContext, ReactNode, useState } from "react";
import { useCookies } from "react-cookie";
import { client } from "../graphql";
import { getUserByToken, LoginQuery } from "../graphql/query";
import { User } from "../types";

type authContextType = {
  user: User;
};

const authContextDefaultValues: authContextType = {
  user: null,
};

export const AuthContext = createContext<authContextType>(
  authContextDefaultValues
);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};
interface LoginResponse {
  error: string;
  token: string;
  id: string;
}
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [user, setUser] = useState<User>(null);

  const findUser = async () => {
    if (!cookies.userAuthToken) return;
    const foundUser = await getUserByToken(cookies.userAuthToken);
    setUser(foundUser);
  };
  findUser();
  const value = {
    user
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
