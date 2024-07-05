import React from "react";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ffffff",
    text: "#ffffff",
    background: "transparent",
    tabBarBackground: "#000000", // Add your tab bar background color here
    tabBarActiveTintColor: "#ffffff", // Add your active tab color here
    tabBarInactiveTintColor: "#a0a0a0", // Add your inactive tab color here
  },
};

const Layout = () => {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.tabBarActiveTintColor,
          tabBarInactiveTintColor: theme.colors.tabBarInactiveTintColor,
          tabBarStyle: {
            backgroundColor: theme.colors.tabBarBackground,
          },
        }}
      >
        <Tabs.Screen
          name="transaction"
          options={{
            title: "Transactions",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="history"
                color={color}
                size={size}
                style={{ marginTop: 10 }}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="credit-card"
                color={color}
                size={size}
                style={{ marginTop: 10 }}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="browser"
          options={{
            title: "Browser",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="language"
                color={color}
                size={size}
                style={{ marginTop: 10 }}
              />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
