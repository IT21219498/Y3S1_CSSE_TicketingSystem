import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import QRCode from "react-native-qrcode-svg";
import { UserType } from "../context/UserContext";

const QRGenerator = () => {
  const { userData, setUserData } = useContext(UserType);
  // console.log("userData", userData);
  return (
    <SafeAreaView>
      <View>
        <Text>QRGenerator</Text>
        <QRCode
          value={JSON.stringify({
            email: userData.email,
            nic: userData.nic,
          })}
        />
      </View>
    </SafeAreaView>
  );
};

export default QRGenerator;

const styles = StyleSheet.create({});
