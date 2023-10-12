import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import QRCode from "react-native-qrcode-svg";
import { UserType } from "../context/UserContext";
import Header from "./MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const QRGenerator = () => {
  const { userData, setUserData } = useContext(UserType);
  // console.log("userData", userData);
  return (
    <SafeAreaView>
      <Header title={"QR Generator"} />
      <View
        style={{
          marginTop: 300,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <QRCode
            value={JSON.stringify({
              email: userData.email,
              nic: userData.nic,
            })}
            size={300}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QRGenerator;

const styles = StyleSheet.create({});
