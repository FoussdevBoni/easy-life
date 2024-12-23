import React, { useRef, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";

const ScrollingMessage = ({message}) => {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const startScrolling = () => {
      Animated.loop(
        Animated.timing(scrollAnim, {
          toValue: 1,
          duration: 10000, // Durée pour traverser tout l'écran (ajustable)
          useNativeDriver: true,
        })
      ).start();
    };

    startScrolling();
  }, [scrollAnim]);

  // Calculer la position du défilement
  const translateX = scrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth, -screenWidth], // De droite à gauche
  });

  return (
    <ScrollView horizontal style={styles.container}>
      <Animated.Text numberOfLines={2} style={[styles.message, { transform: [{ translateX }] }]}>
        {message} 
      </Animated.Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 4,
    borderRadius: 5,
    overflow: "hidden",
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
    whiteSpace: "nowrap", // Texte sur une seule ligne
  },
});

export default ScrollingMessage;
