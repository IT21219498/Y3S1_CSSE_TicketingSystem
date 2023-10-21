import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import Header from "../components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

/**
 * Home screen component
 * @returns {JSX.Element} Home screen UI
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  const { inJourney, setInJourney } = useContext(UserType);
  const {
    userData,
    setUserData,
    userDetails,
    setUserDetails,
    loginUser,
    setLoginUser,
  } = useContext(UserType);
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

  useEffect(() => {
    const getUser = async () => {
      axios({
        method: "get",
        url: `http://192.168.1.22:5000/api/getPassengerDetails/${loginUser}`,
      })
        .then((res) => {
          setUserDetails(res.data);

          console.log(userDetails.result.name);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    };

    getUser();
  }, [loginUser]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Home"} />
      <View>
        <Image style={styles.image} source={require("../assets/bus1.png")} />
      </View>

      {role !== "Driver" && (
        <>
          <View style={styles.welcomeView}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeText}>
              {userDetails && userDetails.result.name}..!
            </Text>
          </View>
          {userDetails && userDetails.result.inJourney == true && (
            <View style={styles.journeyView}>
              <Text style={styles.journeyText}>Your are in Journey</Text>
            </View>
          )}
        </>
      )}
      <View>
        {role === "Driver" && (
          <>
            <Pressable
              onPress={() => handleJourney()}
              style={[
                styles.button,
                {
                  backgroundColor: !inJourney ? "#2780e3" : "#d61f2c",
                  borderColor: !inJourney ? "#2780e3" : "#d61f2c",
                },
              ]}
            >
              <Text style={styles.buttonText}>
                {!inJourney ? "Start New Journey" : "End Journey"}
              </Text>
            </Pressable>

            {inJourney && (
              <Pressable
                onPress={() => navigation.navigate("Scanner")}
                style={styles.scanButton}
              >
                <Text style={styles.scanButtonText}>Scan QR Codes</Text>
              </Pressable>
            )}
          </>
        )}
        {role === "Passenger" && (
          <>
            <Pressable
              onPress={() => navigation.navigate("Generator")}
              style={styles.passengerButton}
            >
              <Text style={styles.passengerButtonText}>Generate QR Code</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Payment")}
              style={styles.passengerButton}
            >
              <Text style={styles.passengerButtonText}>Add Credit</Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 1000,
  },
  image: {
    height: 200,
    width: 400,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    width: 300,
    backgroundColor: "#2780e3",
    borderWidth: 1,
    padding: 15,
    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  scanButton: {
    width: 200,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2780e3",
    padding: 15,
    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  scanButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#2780e3",
  },
  passengerButton: {
    width: 200,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2780e3",
    padding: 15,
    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  passengerButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#2780e3",
  },
  welcomeView: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: "Poppins_900Black",
  },
  journeyView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008000",
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  journeyText: { fontFamily: "Poppins_500Medium", fontSize: 20 },
});
