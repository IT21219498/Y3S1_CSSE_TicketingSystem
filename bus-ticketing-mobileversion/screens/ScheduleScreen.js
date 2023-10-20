import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/MainHeader";

/**
 * A screen component that displays the bus schedules.
 *
 * @returns {JSX.Element} The ScheduleScreen component.
 */

const ScheduleScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={" Bus Schedules"} />
      <Image style={styles.image} source={require("../assets/bus2.jpg")} />
      <View>
        <Text>ScheduleScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ScheduleScreen;

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
});
