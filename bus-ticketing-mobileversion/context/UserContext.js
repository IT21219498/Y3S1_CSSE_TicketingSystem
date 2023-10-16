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

  return (
    <UserType.Provider
      value={{ userData, setUserData, inJourney, setInJourney }}
    >
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
