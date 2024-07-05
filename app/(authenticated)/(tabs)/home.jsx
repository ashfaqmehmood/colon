import { React, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";
import { Button, DefaultTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../../lib/store";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ffffff",
    text: "#ffffff",
    background: "transparent",
  },
};

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#000000", "#111111"]} style={styles.background}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Welcome, {user?.name || "User"}</Text>
          <Text style={styles.info}>{user?.email}</Text>

          <View style={styles.profileContainer}>
            <Image
              source={{ uri: user?.profileImage }}
              style={styles.profileImage}
            />
          </View>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.button}
            labelStyle={styles.buttonText}
            icon={() => (
              <Ionicons name="log-out-outline" size={20} color="#ffffff" />
            )}
          >
            Logout
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
}

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
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Helvetica Neue",
  },
  subtitle: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Helvetica Neue",
  },
  info: {
    fontSize: 18,
    color: "#a0a0a0",
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Helvetica Neue",
  },
  profileContainer: {
    marginBottom: 32,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: "#111111", // Added solid background color
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  button: {
    marginVertical: 8,
    borderColor: "#333333",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
