import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";

const QRGenerator = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>QRGenerator</Text>
        <QRCode value='https://github.com/IT21219498' />
      </View>
    </SafeAreaView>
  );
};

export default QRGenerator;

const styles = StyleSheet.create({});
