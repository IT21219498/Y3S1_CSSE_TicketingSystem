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
    <View
      style={{
        backgroundColor: "#0718C4",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* <View style={{ marginLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome name='user-circle' size={30} color='black' />
          </TouchableOpacity>
        </View> */}
      <View
        style={{
          flex: 1, // Take up available space
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          //   source={{
          //     uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png",
          //   }}

          source={require("../assets/logo/logo2.png")}
          style={styles.headerImage}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Poppins_700Bold",
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ marginRight: 10 }}>
        {/* <TouchableOpacity onPress={() => navigation.navigate("MyAppointments")}>
            <FontAwesome name='bell' size={30} color='black' marginRight='10' />
          </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerImage: {
    width: 200, // Adjust the image width as needed
    height: 35, // Adjust the image height as needed
    resizeMode: "contain", // Makes sure the image doesn't get distorted
    // tintColor: "black",
  },
});
