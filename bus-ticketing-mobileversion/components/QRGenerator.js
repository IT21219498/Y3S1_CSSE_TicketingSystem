import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import QRCode from "react-native-qrcode-svg";
import { UserType } from "../context/UserContext";
import Header from "./MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * A functional component that generates a QR code for the user's ID.
 * @returns {JSX.Element} A React JSX element that displays the generated QR code.
 */

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
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={JSON.stringify({
              id: userData._id,
            })}
            size={300}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default QRGenerator;
