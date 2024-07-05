import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

const AnimatedLoader = ({
  children,
  isLoading,
  backgroundColor = "#000000",
  textColor = "#FFFFFF",
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.cubic,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 1500,
            easing: Easing.cubic,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(opacityValue, {
          toValue: 0.3,
          duration: 500,
          easing: Easing.cubic,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.parallel([
          Animated.timing(spinValue, {
            toValue: 2,
            duration: 1500,
            easing: Easing.cubic,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.cubic,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.cubic,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        spinValue.setValue(0);
        animate();
      });
    };

    animate();
  }, [spinValue, scaleValue, opacityValue]);

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [isLoading, fadeAnim]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0deg", "180deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {children}
      <Animated.View
        style={[
          styles.loaderContainer,
          {
            opacity: fadeAnim,
            zIndex: isLoading ? 1 : 0,
            pointerEvents: isLoading ? "auto" : "none",
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.colon,
            {
              transform: [{ rotate: spin }, { scale: scaleValue }],
              opacity: opacityValue,
              color: textColor,
            },
          ]}
        >
          :
        </Animated.Text>
        <Animated.Text style={[styles.loadingText, { color: textColor }]}>
          Loading
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  colon: {
    fontSize: 120,
    fontFamily: "SpaceMono",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
    marginTop: 20,
    letterSpacing: 2,
  },
});

export default AnimatedLoader;
