import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/MainHeader";
import { KeyboardAvoidingView } from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import PaymentDetails from "../components/PaymentDetails";
import { UserType } from "../context/UserContext";
import axios from "axios";
import { Alert } from "react-native";

/**
 * Payment screen component.
 * @returns {JSX.Element} Payment screen UI.
 */
const PaymentScreen = () => {
  const { loginUser, setLoginUser, userDetails, setUserDetails } =
    useContext(UserType);
  const [userData, setUserData] = useState({
    accBalance: "",
    type: "ONLINE",
  });

  const handlePayment = () => {
    //add payment logic
    axios
      .put(`http://192.168.1.22:5000/api/addTransaction/${loginUser}`, userData)
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          Alert.alert("Payment Failed");
          return;
        }
        console.log(res.data);
        userData.accBalance = "";
        setUserData(userData);
        getUser();
        Alert.alert("Payment Successful");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Payment Failed");
      });
  };

  const getUser = async () => {
    axios({
      method: "get",
      url: `http://192.168.1.22:5000/api/getPassengerDetails/${loginUser}`,
    })
      .then((res) => {
        setUserDetails(res.data);
        console.log(
          "🚀 ~ file: PaymentScreen.js:55 ~ .then ~ res.data:",
          res.data
        );

        // console.log(userDetails.result.name);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: 1000 }}>
      <Header title={"Add Credit"} />

      <PaymentDetails userData={userData} setUserData={setUserData} />

      <Pressable
        onPress={handlePayment}
        style={[styles.button, styles.payButton]}
      >
        <Text style={styles.payButtonText}>Pay</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 15,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  payButton: {
    backgroundColor: "#0718C4",
  },
  payButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
