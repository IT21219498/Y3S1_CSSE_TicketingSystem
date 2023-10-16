import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";

/**
 * Renders a modal for entering card details and processing payment.
 * @param {Object} props - The component props.
 * @param {boolean} props.isVisible - Whether the modal is visible or not.
 * @param {function} props.onClose - Function to close the modal.
 * @param {function} props.onSuccess - Function to handle successful payment.
 * @returns {JSX.Element} - The PaymentGateway component.
 */
export default function EmojiPicker({ isVisible, onClose, onSuccess }) {
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter your card details</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name='close' color='#fff' size={22} />
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            borderColor: "#2780e3",
            backgroundColor: "#fff",
            borderWidth: 1,
            paddingVertical: 5,
            borderRadius: 5,
          }}
        >
          <TextInput
            name='accBalance'
            // value={userData.accBalance}
            // onChangeText={(value) => handleInputChange("accBalance", value)}
            placeholderTextColor={"#2780e3"}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              paddingLeft: 10,
              //   fontSize: userData.accBalance ? 16 : 16,
            }}
            placeholder='Enter card number*'
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#2780e3",
              backgroundColor: "#fff",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <TextInput
              name='accBalance'
              // value={userData.accBalance}
              // onChangeText={(value) => handleInputChange("accBalance", value)}
              placeholderTextColor={"#2780e3"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 150,
                paddingLeft: 10,
                //   fontSize: userData.accBalance ? 16 : 16,
              }}
              placeholder='Expiration Year*'
            />
          </View>
          <View
            style={{
              marginTop: 10,

              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#2780e3",
              backgroundColor: "#fff",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <TextInput
              name='accBalance'
              // value={userData.accBalance}
              // onChangeText={(value) => handleInputChange("accBalance", value)}
              placeholderTextColor={"#2780e3"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 150,
                paddingLeft: 10,
                //   fontSize: userData.accBalance ? 16 : 16,
              }}
              placeholder='Expiration Month*'
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#2780e3",
              backgroundColor: "#fff",
              borderWidth: 1,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <TextInput
              name='accBalance'
              // value={userData.accBalance}
              // onChangeText={(value) => handleInputChange("accBalance", value)}
              placeholderTextColor={"#2780e3"}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 150,
                paddingLeft: 10,
                //   fontSize: userData.accBalance ? 16 : 16,
              }}
              placeholder='CVN*'
            />
          </View>
          <Image
            style={{
              justifyContent: "center",
              marginTop: 20,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
            }}
            source={require("../assets/CVN.png")}
          />
        </View>
        <Pressable
          onPress={onSuccess}
          style={{
            width: 200,
            backgroundColor: "#2780e3",
            borderWidth: 1,
            borderColor: "#2780e3",
            padding: 15,
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
            }}
          >
            Proceed
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "50%",
    width: "100%",
    backgroundColor: "#ADD8E6",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "10%",
    backgroundColor: "#0718C4",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
