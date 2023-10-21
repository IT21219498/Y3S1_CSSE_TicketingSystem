import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./MainHeader";

/**
 * Renders a QR scanner component that allows the user to scan a QR code and navigate to the Passenger screen with the ticket ID.
 * @returns {JSX.Element} The QR scanner component.
 */
export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  /**
   * Handles the scanned QR code data and navigates to the Passenger screen with the ticket ID.
   * @param {Object} param0 - The scanned QR code data.
   * @param {string} param0.type - The type of the scanned QR code.
   * @param {string} param0.data - The data of the scanned QR code.
   */
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    data = JSON.parse(data);
    // console.log(data);
    navigation.navigate("Passenger", {
      ticketId: data,
    });
    alert(`Bar code has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"QR Scanner"} />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barCodeScanner}
      />
      {scanned && (
        <View style={styles.scanAgainButtonContainer}>
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
      <Pressable
        style={styles.cancelButton}
        title={"Cancel"}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  barCodeScanner: {
    ...StyleSheet.absoluteFillObject,
  },
  scanAgainButtonContainer: {
    marginTop: 20,
  },
  cancelButton: {
    width: 300,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#2780e3",
    padding: 15,
    marginTop: 500,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  cancelButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#2780e3",
  },
});
