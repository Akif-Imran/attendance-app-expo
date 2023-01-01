import { StyleSheet, Text, View } from "react-native";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { ApiLoginResponseUser, UserContextType } from "../types";

const UserContext = createContext<UserContextType>({
  isAuthorized: false,
  setIsAuthorized: () => {},
  setUser: () => {},
  user: {
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    userType: "",
  },
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<ApiLoginResponseUser | undefined>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthorized,
        setIsAuthorized,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;

export const useUserContext = () => useContext(UserContext);

const styles = StyleSheet.create({});
