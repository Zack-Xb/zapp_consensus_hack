import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const ReceiveScreen = () => {
  return (
    <>
      <View style={styles.titleContainer}>
        <FontAwesome6
          name="hand-holding-dollar"
          size={28}
          style={styles.icon}
        />
        <Text style={styles.titleText}>Receive Money</Text>
      </View>
      <View style={styles.container}>
        <Image
          source={require("../../assets/phoneqr.png")}
          style={styles.image}
        ></Image>
        <Text style={styles.text}>Let other Zappers scan this QR code!</Text>
      </View>
    </>
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
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  titleText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 30,
    justifyContent: "center",
    backgroundColor: "black",
    marginTop: 30,
  },
  text: {
    color: "green",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    borderRadius: 10,
  },
  icon: {
    color: "green",
    marginTop: 30,
    marginRight: 10,
  },
});

export default ReceiveScreen;
