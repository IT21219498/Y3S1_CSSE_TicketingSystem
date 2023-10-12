import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/MainHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { userData, setUserData } = useContext(UserType);
  const navigation = useNavigation();

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");

    setUserData(null);

    console.log("token removed");

    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: 1000 }}>
      <Header title={"Profile"} />
      <View>
        <Image
          style={{
            height: 240,
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          source={require("../assets/bus3.jpg")}
        />
      </View>
      <View
        style={{
          marginTop: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Text>ProfileScreen</Text> */}
        <Pressable
          onPress={logout}
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderColor: "#2780e3",
            borderWidth: 1,
            width: 300,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#2780e3" }}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
