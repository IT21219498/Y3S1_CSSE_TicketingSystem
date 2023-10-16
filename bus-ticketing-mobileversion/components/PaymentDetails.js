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
    <View style={{ marginBottom: 250 }}>
      <KeyboardAvoidingView style={{ alignItems: "center", marginBottom: 30 }}>
        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#2780e3",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <FontAwesome
              style={{ marginLeft: 8, marginRight: 8 }}
              name='money'
              size={24}
              color='#2780e3'
            />
            <TextInput
              name='accBalance'
              value={userData.accBalance}
              onChangeText={(value) => handleInputChange("accBalance", value)}
              placeholderTextColor={"#2780e3"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: userData.accBalance ? 16 : 16,
              }}
              placeholder='Enter credit amount'
            />
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text>Select Your Card Type</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Pressable
              onPress={handlePayment}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#2780e3",
                marginRight: 10,
              }}
            >
              <Image
                source={{
                  uri: "https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png",
                }}
                style={{ width: 100, height: 50 }}
              />
            </Pressable>
            <Pressable
              onPress={handlePayment}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#2780e3",
                marginRight: 10,
              }}
            >
              <Image
                source={{
                  uri: "https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg",
                }}
                style={{ width: 100, height: 50 }}
              />
            </Pressable>
            <Pressable
              onPress={handlePayment}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#2780e3",
              }}
            >
              <Image
                source={{
                  uri: "https://logowik.com/content/uploads/images/amex-card1708.jpg",
                }}
                style={{ width: 100, height: 50 }}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      {success && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Poppins_800ExtraBold",
              color: "#53a653",
              fontSize: 30,
            }}
          >
            Card Details Added !
          </Text>
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

const styles = StyleSheet.create({});
