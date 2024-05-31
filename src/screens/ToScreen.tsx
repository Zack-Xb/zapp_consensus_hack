import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { NavigationType } from "../type/screenType";

const ToScreen = () => {
  const [recipient, setRecipient] = useState("");

  const navigation = useNavigation<NavigationType>();

  const handlePress = (num: string) => {
    let formattedNumber = recipient + num;
    formattedNumber = formattedNumber
      .replace(/(\d{2})(\d{3})(\d{4})/, "($1) $2-$3")
      .slice(0, 17);
    setRecipient(formattedNumber);
  };

  const handleBack = () => {
    let formattedNumber = recipient.slice(0, -1);
    formattedNumber = formattedNumber
      .replace(/(\d{2})(\d{3})(\d{4})/, "($1) $2-$3")
      .slice(0, 17);
    setRecipient(formattedNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Please Input Recipient Phone Number</Text>
      <View style={styles.display}>
        <View style={styles.amountContainer}>
          <Text style={styles.text}>+ {recipient}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialIcons
              name="navigate-next"
              style={styles.sendIcon}
              onPress={() =>
                navigation.navigate("SendScreen", { recipient: recipient })
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.button}
            onPress={() => handlePress(num.toString())}
          >
            <Text style={styles.buttonText}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.closedButton}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress("0")}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBack}
        >
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  display: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: "grey",
    fontSize: 20,
    marginTop: 10,
  },
  text: {
    alignItems: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  amountContainer: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  button: {
    width: "30%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#536A0E",
    borderRadius: 30,
    margin: 5,
  },
  closedButton: {
    width: "30%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242521",
    borderRadius: 30,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
  sendIcon: {
    color: "white",
    fontSize: 40,
    borderColor: "white",
  },
});

export default ToScreen;
