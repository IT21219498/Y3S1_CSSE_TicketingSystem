import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

/**
 * A functional component that renders the main header of the mobile app.
 * @param {Object} props - The props object that contains the title of the header.
 * @param {string} props.title - The title of the header.
 * @returns {JSX.Element} - The JSX code that renders the main header.
 */

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo/logo2.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightContainer}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0718C4",
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 35,
    resizeMode: "contain",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  rightContainer: {
    marginRight: 10,
  },
});
