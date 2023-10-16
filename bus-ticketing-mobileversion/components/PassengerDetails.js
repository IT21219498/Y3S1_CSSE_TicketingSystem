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

/**
 * Renders a form for entering passenger details.
 * @param {Object} props - Component props.
 * @param {Object} props.userData - Object containing passenger data.
 * @param {Function} props.setUserData - Function to update passenger data.
 * @returns {JSX.Element} - Rendered component.
 */
const PassengerDetails = ({ userData, setUserData }) => {
  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <ScrollView>
        <KeyboardAvoidingView>
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
              <Ionicons
                style={{ marginLeft: 8, marginRight: 8 }}
                name='person'
                size={24}
                color='#2780e3'
              />
              <TextInput
                name='name'
                value={userData.name}
                onChangeText={(value) => handleInputChange("name", value)}
                placeholderTextColor={"#2780e3"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: userData.name ? 16 : 16,
                }}
                placeholder='Enter your name'
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
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
              <MaterialIcons
                style={{ marginLeft: 8, marginRight: 8 }}
                name='email'
                size={24}
                color='#2780e3'
              />
              <TextInput
                name='email'
                value={userData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                placeholderTextColor={"#2780e3"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: userData.email ? 16 : 16,
                }}
                placeholder='Enter your email'
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
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
                name='id-card'
                size={24}
                color='#2780e3'
              />
              <TextInput
                name='nic'
                value={userData.nic}
                onChangeText={(value) => handleInputChange("nic", value)}
                placeholderTextColor={"#2780e3"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: userData.nic ? 16 : 16,
                }}
                placeholder='Enter your NIC'
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
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
              <Entypo
                style={{ marginLeft: 8, marginRight: 8 }}
                name='address'
                size={24}
                color='#2780e3'
              />
              <TextInput
                name='address'
                value={userData.address}
                onChangeText={(value) => handleInputChange("address", value)}
                placeholderTextColor={"#2780e3"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: userData.address ? 16 : 16,
                }}
                placeholder='Enter your Address'
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
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
              <Entypo
                style={{ marginLeft: 8, marginRight: 8 }}
                name='old-phone'
                size={24}
                color='#2780e3'
              />
              <TextInput
                name='contactNo'
                value={userData.contactNo}
                onChangeText={(value) => handleInputChange("contactNo", value)}
                placeholderTextColor={"#2780e3"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: userData.contactNo ? 16 : 16,
                }}
                placeholder='Enter your Contact Number'
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
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
              <AntDesign
                style={{ marginLeft: 8, marginRight: 8 }}
                name='unlock'
                size={24}
                color='#2780e3'
              />
              <TextInput
                name='password'
                secureTextEntry={true}
                value={userData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                placeholderTextColor={"#2780e3"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: userData.password ? 16 : 16,
                }}
                placeholder='Enter your password'
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
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
              <AntDesign
                style={{ marginLeft: 8, marginRight: 8 }}
                name='lock'
                size={24}
                color='#2780e3'
              />
              <TextInput
                name='confirmPassword'
                secureTextEntry={true}
                value={userData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                placeholderTextColor={"#2780e3"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: userData.confirmPassword ? 16 : 16,
                }}
                placeholder='Confirm your password'
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default PassengerDetails;

const styles = StyleSheet.create({});
