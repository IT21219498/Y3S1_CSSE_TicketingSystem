import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import Header from "../components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Home screen component
 * @returns {JSX.Element} Home screen UI
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  const { inJourney, setInJourney } = useContext(UserType);
  const { userData, setUserData } = useContext(UserType);
  const { role = "Passenger" } = userData;

  /**
   * Handles starting and ending a journey
   */
  function handleJourney() {
    if (!inJourney) {
      setInJourney(true);
    } else {
      setInJourney(false);
    }
  }

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
        {role === "Driver" && (
          <>
            <Pressable
              onPress={() => handleJourney()}
              style={{
                width: 300,
                backgroundColor: !inJourney ? "#2780e3" : "#d61f2c",
                borderWidth: 1,
                borderColor: !inJourney ? "#2780e3" : "#d61f2c",
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
                  color: "white",
                }}
              >
                {!inJourney ? "Start New Journey" : "End Journey"}
              </Text>
            </Pressable>

            {inJourney && (
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
                  Scan QR Codes
                </Text>
              </Pressable>
            )}
          </>
        )}
        {role === "Passenger" && (
          <>
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
