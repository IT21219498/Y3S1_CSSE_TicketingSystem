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

    if (userData.password !== userData.confirmPassword) {
      Alert.alert("password do not match");
      return;
    }

    axios
      .post(`http://192.168.1.6:5000/api/createPermanantPassenger`, userData)
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

  function pageNumberHandler(event) {
    if (currentPage === 1) {
      setCurrentPage(2);
    } else if (currentPage === 2) {
      setCurrentPage(1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo/logo2.png")}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {currentPage === 1 ? "Enter Your Details" : "Enter Payment Details"}
        </Text>
      </View>

      {currentPage === 1 && (
        <PassengerDetails userData={userData} setUserData={setUserData} />
      )}
      {currentPage === 2 && (
        <PaymentDetails userData={userData} setUserData={setUserData} />
      )}

      <View
        style={
          currentPage === 1 ? styles.buttonContainer1 : styles.buttonContainer2
        }
      >
        {currentPage === 2 && (
          <Pressable onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>
        )}
        <Pressable
          onPress={(event) => pageNumberHandler(event)}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>
            {currentPage === 1 ? "Next" : "Back"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.signInButton}
        >
          <Text style={styles.signInButtonText}>
            Already have an account?{" "}
            <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 10,
  },
  logo: {
    width: 240,
    height: 120,
    resizeMode: "contain",
    // tintColor: "black",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 1,
  },
  buttonContainer1: {
    marginTop: 1,
    marginBottom: 10,
  },
  buttonContainer2: {
    marginTop: -140,
    marginBottom: 10,
  },
  registerButton: {
    width: 200,
    backgroundColor: "#0718C4",
    padding: 15,
    marginTop: 80,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  registerButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  nextButton: {
    width: 200,
    backgroundColor: "#0718C4",
    padding: 15,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
    marginBottom: 10,
  },
  nextButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  signInButton: {
    marginTop: 10,
  },
  signInButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
  signInLink: {
    color: "#007FFF",
    marginLeft: 10,
  },
});
