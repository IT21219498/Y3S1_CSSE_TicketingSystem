import { StyleSheet, Text, View, Pressable, Image } from "react-native";
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
  const [scannedPassenger, setScannedPassenger] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState({});
  const { ticketId } = route.params;
  const navigation = useNavigation();

  /**
   * Plays a success sound when a journey is started successfully.
   * @returns {Promise<void>}
   */
  const playSuccessSoundStart = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../raw/welcome.mp3")
    );
    await sound.playAsync();
  };

  const playSuccessSoundEnd1 = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../raw/thankyou.mp3")
    );
    await sound.playAsync();
  };
  const playSuccessSoundEnd2 = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../raw/bye.mp3"));
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
        url: `http://192.168.1.6:5000/api/startOrEndJourney/${Id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          setScannedPassenger(true);
          setPassengerDetails(res.data.result);

          if (res.data.result.inJourney === true) {
            playSuccessSoundStart();
          } else {
            setTimeout(() => {
              playSuccessSoundEnd2();
            }, 2000); // delay execution of playSuccessSoundEnd2 by 3 seconds
            playSuccessSoundEnd1();
          }
        })
        .catch((err) => {
          console.log("Error", err);
          setScannedPassenger(false);
          // add failure sound
          playFailureSound();
        });
    };

    startJourney(ticketId.id);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: 1000 }}>
      <Header title={"Journey Details"} />

      {scannedPassenger === true ? (
        <>
          <View
            style={{
              margin: 20,
              backgroundColor: "green",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 30 }}>
              Valid Passenger..!
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              margin: 10,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 30 }}>
              Passenger Details
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "Poppins_300Light" }}>
              Passenger ID : {passengerDetails._id}
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "Poppins_300Light" }}>
              Passenger Name : {passengerDetails.name}
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "Poppins_300Light" }}>
              Passenger NIC : {passengerDetails.nic}
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "Poppins_300Light" }}>
              Passenger Account Balance : {passengerDetails.accBalance}
            </Text>

            {passengerDetails.inJourney === true ? (
              <View
                style={{
                  borderRadius: 5,
                  margin: 10,
                  alignItems: "center",
                  backgroundColor: "#2780e3",
                  padding: 10,
                }}
              >
                <Text
                  style={{ fontSize: 20, fontFamily: "Poppins_600SemiBold" }}
                >
                  Status : Started Journey
                </Text>
              </View>
            ) : (
              <View
                style={{
                  borderRadius: 5,
                  margin: 10,
                  alignItems: "center",
                  backgroundColor: "red",
                  padding: 10,
                }}
              >
                <Text
                  style={{ fontSize: 20, fontFamily: "Poppins_600SemiBold" }}
                >
                  Status : End Journey
                </Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              margin: 20,
              backgroundColor: "red",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 30 }}>
              Invalid Passenger..!
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#2780e3",
              borderRadius: 10,
              margin: 20,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 300, height: 300 }}
              source={require("../assets/warn.jpg")}
            />
          </View>
        </>
      )}

      <View>
        <Pressable
          onPress={() => navigation.navigate("Main")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
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
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#2780e3",
  },
});

export default PassengersScreen;
