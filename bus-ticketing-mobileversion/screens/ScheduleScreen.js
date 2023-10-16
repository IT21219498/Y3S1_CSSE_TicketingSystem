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
    <SafeAreaView style={{ backgroundColor: "white", height: 1000 }}>
      <Header title={" Bus Schedules"} />
      <Image
        style={{
          height: 200,
          width: 400,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        source={require("../assets/bus2.jpg")}
      />
      <View>
        <Text>ScheduleScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({});
