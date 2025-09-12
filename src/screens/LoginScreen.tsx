import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import { login } from "../features/authSlice";
import { getData } from "../utils/storage";

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation<LoginNavProp>();

  const generateToken = () => Math.random().toString(36).substring(2);

  const handleLogin = async () => {
    const storedUser = await getData("user");

    if (!storedUser) {
      Alert.alert("Error", "No user found! Please signup first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      const token = generateToken();
      await AsyncStorage.setItem("userToken", token);
      dispatch(login(token));

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      Alert.alert("Error", "Invalid email or password!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#888"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("Signup")}
        >
          Don’t have an account?{" "}
          <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#4e8cff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 14,
    color: "#555",
  },
  signupLink: {
    color: "#4e8cff",
    fontWeight: "600",
  },
});
