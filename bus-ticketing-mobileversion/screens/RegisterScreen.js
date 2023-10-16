import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import PassengerDetails from "../components/PassengerDetails";
import PaymentDetails from "../components/PaymentDetails";
import { BASE_URL } from "@env";

/**
 * Functional component for the Register Screen.
 * @returns {JSX.Element} JSX element containing the Register Screen UI.
 */
const RegisterScreen = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    nic: "",
    contactNo: "",
    address: "",
    accBalance: "",
    type: "ONLINE",
    password: "",
    confirmPassword: "",
    created: false,
  });
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Handles the registration process when the Register button is pressed.
   * Sends a POST request to the server to create a new permanent passenger account.
   * Navigates to the Login Screen upon successful registration.
   * Displays an error message if registration fails.
   */
  const handleRegister = () => {
    console.log(userData);
    if (
      !userData.name ||
      !userData.email ||
      !userData.nic ||
      !userData.address ||
      !userData.contactNo ||
      !userData.password ||
      !userData.confirmPassword
    ) {
      Alert.alert("Please enter all the required fields!");
      return;
    }

    //check if the password and confirm password match
    if (userData.password !== userData.confirmPassword) {
      Alert.alert("password do not match");
      return;
    }

    axios
      .post(`${BASE_URL}/createPermanantPassenger`, userData)
      .then((res) => {
        console.log(res);
        Alert.alert("Passenger Registered Successfully");
        navigation.navigate("Login");
      })
      .catch((err) => {
        Alert.alert("Registration failed", "Something went wrong");
        console.log("Error", err);
      });
  };

  /**
   * Handles the page number when the Next or Back button is pressed.
   * Toggles between page 1 and page 2.
   * @param {Object} event - The event object.
   */
  function pageNumberHandler(event) {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (currentPage === 2) {
      setCurrentPage(1);
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 10 }}>
        <Image
          style={{
            width: 240,
            height: 120,
            resizeMode: "contain",
            // tintColor: "black",
          }}
          source={require("../assets/logo/logo2.png")}
        />
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 1 }}>
          {currentPage === 1 ? "Enter Your Details" : "Enter Payment Details"}
        </Text>
      </View>

      {currentPage === 1 && (
        <PassengerDetails userData={userData} setUserData={setUserData} />
      )}
      {currentPage === 2 && (
        <PaymentDetails userData={userData} setUserData={setUserData} />
      )}

      <View style={{ marginTop: 1, marginBottom: 10 }}>
        {currentPage === 2 && (
          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#0718C4",
              padding: 15,
              marginTop: 80,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
              }}
            >
              Register
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={(event) => pageNumberHandler(event)}
          style={{
            width: 200,
            backgroundColor: "#0718C4",
            padding: 15,
            marginTop: 20,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
            }}
          >
            {currentPage === 1 ? "Next" : "Back"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: 10 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Already have an account?{" "}
            <Text style={{ color: "#007FFF", marginLeft: 10 }}>Sign In</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
