import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import QRScanner from "./components/QRScanner";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import QRGenerator from "./components/QRGenerator";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ScheduleScreen from "./screens/ScheduleScreen";
import ProfileScreen from "./screens/ProfileScreen";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import PaymentScreen from "./screens/PaymentScreen";
import PassengersScreen from "./screens/PassengersScreen";

/**
 * StackNavigator component that creates a stack navigator and a bottom tab navigator
 * @returns {JSX.Element} JSX element containing the stack navigator and bottom tab navigator
 */
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  /**
   * Bottomtabs component that creates a bottom tab navigator with three screens
   * @returns {JSX.Element} JSX element containing the bottom tab navigator
   */
  function Bottomtabs() {
    return (
      <Tab.Navigator
        activeColor='white'
        inactiveColor='white'
        barStyle={{ backgroundColor: "#0718C4", height: 70 }}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "white" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name='home' size={24} color='black' />
              ) : (
                <AntDesign name='home' size={24} color='black' />
              ),
          }}
        />
        <Tab.Screen
          name='Schedules'
          component={ScheduleScreen}
          options={{
            tabBarLabel: "Schedules",
            tabBarLabelStyle: { color: "white" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='time-sharp' size={24} color='black' />
              ) : (
                <Ionicons name='time-outline' size={24} color='black' />
              ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "white" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name='person' size={24} color='black' />
              ) : (
                <Ionicons name='person-outline' size={24} color='black' />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Main'
        component={Bottomtabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Scanner'
        component={QRScanner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Generator'
        component={QRGenerator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Payment'
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Passenger'
        component={PassengersScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
