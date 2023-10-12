import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import Header from "../components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: 1000 }}>
      <Header title={"Home"} />
      <View>
        <Image
          style={{
            height: 200,
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          source={require("../assets/bus1.png")}
        />
      </View>
      <View>
        <Pressable
          onPress={() => navigation.navigate("Scanner")}
          style={{
            width: 200,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#2780e3",
            padding: 15,
            marginTop: 40,
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
              color: "#2780e3",
            }}
          >
            Scan QR Code
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Generator")}
          style={{
            width: 200,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#2780e3",
            padding: 15,
            marginTop: 40,
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
              color: "#2780e3",
            }}
          >
            Generate QR Code
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Payment")}
          style={{
            width: 200,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#2780e3",
            padding: 15,
            marginTop: 40,
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
              color: "#2780e3",
            }}
          >
            Add Credit
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
