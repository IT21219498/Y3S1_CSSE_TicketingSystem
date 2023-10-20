import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserType } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "@env";

/**
 * Login screen component for the bus ticketing mobile application.
 * Allows users to log in to their account using their email and password.
 * If the user is already logged in, they will be redirected to the main screen.
 * @returns {JSX.Element} Login screen UI.
 */
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState();
  const {
    userData,
    setUserData,
    loginUser,
    setLoginUser,
    userDetails,
    setUserDetails,
  } = useContext(UserType);

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        axios({
          method: "get",
          url: `http://192.168.1.6:5000/api/me`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            setUserData(res.data);
            console.log(res.data);
            setLoginUser(res.data._id);
            console.log(loginUser);
            getUser();

            if (!res.error) {
              setTimeout(() => {
                navigation.replace("Main");
              }, 400);
            }
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    };

    checkLoginStatus();
  }, []);

  const getUser = async () => {
    axios({
      method: "get",
      url: `http://192.168.1.6:5000/api/getPassengerDetails/${loginUser}`,
    })
      .then((res) => {
        setUserDetails(res.data);

        console.log(userDetails.result.name);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios({
      method: "post",
      url: `http://192.168.1.6:5000/api/login`,
      data: user,
    })
      .then((res) => {
        // console.log(res);
        setUserData(res.data.user);
        setLoginUser(res.data.user._id);
        const token = res.data.jwtToken;

        AsyncStorage.setItem("authToken", token);

        navigation.navigate("Main");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo/logo2.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login to Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              style={styles.inputIcon}
              name='email'
              size={24}
              color='gray'
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={styles.input}
              placeholder='Enter your email'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <AntDesign
              style={styles.inputIcon}
              name='lock'
              size={24}
              color='gray'
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={"gray"}
              style={styles.input}
              placeholder='Enter your password'
            />
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxText}>Keep me logged in</Text>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>
              Don't have an account?{" "}
              <Text style={styles.registerLink}>Register</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 100,
  },
  logo: {
    width: 240,
    height: 120,
    resizeMode: "contain",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
  },
  inputIcon: {
    marginLeft: 8,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  checkboxText: {
    color: "gray",
  },
  forgotPasswordText: {
    fontWeight: "500",
    color: "#007FFF",
  },
  buttonContainer: {
    marginTop: 45,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#0718C4",
    padding: 15,
    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  loginButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  registerButton: {
    marginTop: 10,
  },
  registerButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
  registerLink: {
    color: "#007FFF",
    marginLeft: 10,
  },
});
