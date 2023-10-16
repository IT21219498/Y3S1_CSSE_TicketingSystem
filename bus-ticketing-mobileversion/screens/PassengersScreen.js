import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/MainHeader";
import axios from "axios";
import { BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

/**
 * PassengersScreen component displays the details of a passenger's journey.
 * @param {object} route - The route object containing the ticketId parameter.
 * @returns {JSX.Element} - A JSX element representing the PassengersScreen component.
 */
const PassengersScreen = ({ route }) => {
  const [passengerCount, setPassengerCount] = useState(0);
  const { ticketId } = route.params;
  const navigation = useNavigation();

  /**
   * Plays a success sound when a journey is started successfully.
   * @returns {Promise<void>}
   */
  const playSuccessSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../raw/ding.wav"));
    await sound.playAsync();
  };

  /**
   * Plays a failure sound when a journey fails to start.
   * @returns {Promise<void>}
   */
  const playFailureSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../raw/warn.wav"));
    await sound.playAsync();
  };

  useEffect(() => {
    /**
     * Starts a journey for the given ticket ID.
     * @param {string} Id - The ID of the ticket for which to start the journey.
     * @returns {Promise<void>}
     */
    const startJourney = async (Id) => {
      const token = await AsyncStorage.getItem("authToken");
      axios({
        method: "put",
        url: `http://192.168.1.22:5000/api/startOrEndJourney/${Id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          // add successfull sound
          playSuccessSound();
        })
        .catch((err) => {
          console.log("Error", err);
          // add failure sound
          playFailureSound();
        });
    };

    startJourney(ticketId.id);
  }, []);

  return (
    <SafeAreaView>
      <Header title={"Journey Details"} />
      <View>
        <Text>Passenger ID : {ticketId.id}</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default PassengersScreen;

const styles = StyleSheet.create({});
