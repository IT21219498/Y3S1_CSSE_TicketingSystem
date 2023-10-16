import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
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

/**
 * Payment screen component.
 * @returns {JSX.Element} Payment screen UI.
 */
const PaymentScreen = () => {
  const [userData, setUserData] = useState({
    accBalance: "",
    type: "ONLINE",
  });
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: 1000 }}>
      <Header title={"Add Credit"} />

      <PaymentDetails userData={userData} setUserData={setUserData} />

      <Pressable
        // onPress={(event) => pageNumberHandler(event)}
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
          Pay
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
