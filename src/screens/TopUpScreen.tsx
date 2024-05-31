import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TopUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This feature is still under construction... 🛠️
      </Text>
      <Text style={styles.text}>Check back soon! 🚀 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});

export default TopUpScreen;
