import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import EmojiPicker from "./PaymentGateway";

/**
 * PaymentDetails component displays a form for adding credit to user's account and selecting payment method.
 * @param {Object} props - Component props.
 * @param {Object} props.userData - User data object containing account balance.
 * @param {Function} props.setUserData - Function to update user data object.
 * @returns {JSX.Element} - Rendered component.
 */
const PaymentDetails = ({ userData, setUserData }) => {
  //add a modal
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handlePayment = () => {
    //add payment logic
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <View style={styles.creditAmountContainer}>
          <View style={styles.creditAmountInputContainer}>
            <FontAwesome
              style={styles.creditAmountIcon}
              name='money'
              size={24}
              color='#2780e3'
            />
            <TextInput
              name='accBalance'
              value={userData.accBalance}
              onChangeText={(value) => handleInputChange("accBalance", value)}
              placeholderTextColor={"#2780e3"}
              style={[
                styles.creditAmountInput,
                {
                  fontSize: userData.accBalance ? 16 : 16,
                },
              ]}
              placeholder='Enter credit amount'
            />
          </View>
        </View>
        <View style={styles.cardTypeContainer}>
          <Text style={styles.cardTypeText}>Select Your Card Type</Text>
          <View style={styles.cardTypeOptionsContainer}>
            <Pressable
              onPress={handlePayment}
              style={styles.cardTypeOptionContainer}
            >
              <Image
                source={require("../assets/amex.jpg")}
                style={styles.cardTypeOptionImage}
              />
            </Pressable>
            <Pressable
              onPress={handlePayment}
              style={styles.cardTypeOptionContainer}
            >
              <Image
                source={require("../assets/master.jpg")}
                style={styles.cardTypeOptionImage}
              />
            </Pressable>
            <Pressable
              onPress={handlePayment}
              style={styles.cardTypeOptionContainer}
            >
              <Image
                source={require("../assets/visa.png")}
                style={styles.cardTypeOptionImage}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      {success && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Card Details Added !</Text>
        </View>
      )}

      <EmojiPicker
        isVisible={modalVisible}
        onClose={onModalClose}
        onSuccess={handleSuccess}
      ></EmojiPicker>
    </View>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    marginBottom: 250,
  },
  keyboardAvoidingView: {
    alignItems: "center",
    marginBottom: 30,
  },
  creditAmountContainer: {
    marginTop: 40,
  },
  creditAmountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderColor: "#2780e3",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
  },
  creditAmountIcon: {
    marginLeft: 8,
    marginRight: 8,
  },
  creditAmountInput: {
    color: "gray",
    marginVertical: 10,
    width: 300,
  },
  cardTypeContainer: {
    marginTop: 30,
  },
  cardTypeText: {
    marginBottom: 10,
  },
  cardTypeOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTypeOptionContainer: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2780e3",
    marginRight: 10,
  },
  cardTypeOptionImage: {
    width: 100,
    height: 50,
  },
  successContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontFamily: "Poppins_800ExtraBold",
    color: "#53a653",
    fontSize: 30,
  },
});
