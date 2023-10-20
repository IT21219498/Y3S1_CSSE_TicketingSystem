import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserType = createContext();

/**
 * UserContext component provides user data and journey status to its children components.
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @returns {JSX.Element} - The UserContext component.
 */
const UserContext = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [inJourney, setInJourney] = useState(false);
  const [loginUser, setLoginUser] = useState("652ce128e567967469d195ad");
  const [userDetails, setUserDetails] = useState("");

  return (
    <UserType.Provider
      value={{
        userData,
        setUserData,
        inJourney,
        setInJourney,
        loginUser,
        setLoginUser,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
