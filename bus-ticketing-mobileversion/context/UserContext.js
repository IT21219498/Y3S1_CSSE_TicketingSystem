import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState("");

  return (
    <UserType.Provider value={{ userData, setUserData }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
