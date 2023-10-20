import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/MainHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

/**
 * Profile screen component.
 * @module ProfileScreen
 * @see {@link https://reactnavigation.org/docs/stack-navigator/}
 */

const ProfileScreen = () => {
  const {
    userData,
    setUserData,
    loginUser,
    setLoginUser,
    userDetails,
    setUserDetails,
  } = useContext(UserType);

  const navigation = useNavigation();

  /**
   * Logout function.
   * @function logout
   * @returns {void}
   */
  const logout = () => {
    clearAuthToken();
  };

  /**
   * Clear auth token from async storage and navigate to login screen.
   * @function clearAuthToken
   * @async
   * @returns {void}
   */
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
    setUserData(null);
    console.log("token removed");
  };

  //api call to get user details

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: 1000 }}>
      <Header title={"Profile"} />
      <View>
        <Image style={styles.image} source={require("../assets/bus3.jpg")} />
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 25,
            marginLeft: 20,
            fontFamily: "Poppins_900Black",
          }}
        >
          {userDetails.result.name}
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          margin: 20,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
          Your Account Balance :
        </Text>
        <Text style={{ fontSize: 35, fontWeight: "bold", marginLeft: 20 }}>
          Rs: {userDetails.result.accBalance}
        </Text>
      </View>
      <View style={styles.container}>
        {/* <Text>ProfileScreen</Text> */}
        <Pressable onPress={logout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  image: {
    height: 240,
    width: 400,
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderColor: "#2780e3",
    borderWidth: 1,
    width: 300,
    borderRadius: 5,
  },
  buttonText: {
    color: "#2780e3",
  },
});
