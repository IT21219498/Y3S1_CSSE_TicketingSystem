import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/MainHeader";
import { KeyboardAvoidingView } from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const PaymentScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", height: 1000 }}>
      <Header title={"Add Credit"} />
      <KeyboardAvoidingView style={{ flex: 1, alignItems: "center" }}>
        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <FontAwesome
              style={{ marginLeft: 8 }}
              name='money'
              size={24}
              color='gray'
            />
            <TextInput
              // value={name}
              // onChangeText={(text) => setName(text)}
              placeholderTextColor={"gray"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                //   fontSize: name ? 16 : 16,
              }}
              placeholder='Enter credit amount'
            />
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <FontAwesome
              style={{ marginLeft: 8 }}
              name='money'
              size={24}
              color='gray'
            />
            <TextInput
              // value={name}
              // onChangeText={(text) => setName(text)}
              placeholderTextColor={"gray"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                //   fontSize: name ? 16 : 16,
              }}
              placeholder='Enter credit amount'
            />
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <FontAwesome
              style={{ marginLeft: 8 }}
              name='money'
              size={24}
              color='gray'
            />
            <TextInput
              // value={name}
              // onChangeText={(text) => setName(text)}
              placeholderTextColor={"gray"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                //   fontSize: name ? 16 : 16,
              }}
              placeholder='Enter credit amount'
            />
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <FontAwesome
              style={{ marginLeft: 8 }}
              name='money'
              size={24}
              color='gray'
            />
            <TextInput
              // value={name}
              // onChangeText={(text) => setName(text)}
              placeholderTextColor={"gray"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                //   fontSize: name ? 16 : 16,
              }}
              placeholder='Enter credit amount'
            />
          </View>
        </View>
        <DropDownPicker
          items={[
            { label: "English", value: "en" },
            { label: "Deutsch", value: "de" },
            { label: "French", value: "fr" },
          ]}
          defaultIndex={0}
          containerStyle={{ height: 40 }}
          onSelectItem={(item) => console.log(item)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
