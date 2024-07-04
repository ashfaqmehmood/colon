import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ffffff",
    text: "#ffffff",
    background: "transparent",
  },
};

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#000000", "#111111"]} style={styles.background}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>colon</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <Button
            mode="outlined"
            onPress={() => console.log("Continue with Google")}
            style={styles.button}
            labelStyle={styles.buttonText}
            icon={() => (
              <Ionicons name="logo-google" size={20} color="#ffffff" />
            )}
          >
            Continue with Google
          </Button>

          <Button
            mode="outlined"
            onPress={() => console.log("Continue with Phone")}
            style={styles.button}
            labelStyle={styles.buttonText}
            icon={() => (
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                color="#ffffff"
              />
            )}
          >
            Continue with Phone
          </Button>

          <Button
            mode="outlined"
            onPress={() => console.log("Continue with Apple")}
            style={styles.button}
            labelStyle={styles.buttonText}
            icon={() => (
              <Ionicons name="logo-apple" size={20} color="#ffffff" />
            )}
          >
            Continue with Apple
          </Button>

          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    width: "85%",
    maxWidth: 400,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#a0a0a0",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    marginVertical: 8,
    borderColor: "#333333",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  termsText: {
    color: "#a0a0a0",
    textAlign: "center",
    marginTop: 24,
    fontSize: 12,
  },
});

export default LoginPage;
