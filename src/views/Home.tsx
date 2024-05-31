import * as React from "react";
import { StyleSheet, Text, View, Image, Modal, Platform } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home() {
  const [balance, setBalance] = React.useState<number>(0);

  return (
    <View style={styles.container}>
      {/* This is a row comprised of profile icon ( left ) and Qr code + Help icon (right) */}
      <View style={styles.header}>
        {/* Profile icon */}
        <FontAwesome
          name="user-circle-o"
          size={24}
          color="black"
        />
        <View style={styles.rightHeader}>
          {/* QR Code icon */}
          <FontAwesome
            name="qrcode"
            size={24}
            color="black"
          />
          {/* Help icon */}
          <MaterialCommunityIcons
            name="help-circle"
            size={24}
            color="black"
          />
        </View>
      </View>

      {/* Balance Box */}
      <View style={styles.balanceDiv}>
        <Text>${balance}</Text>
      </View>

      {/* This is a row that contains the 3 main functionalities: Top Up, Send, Receive*/}
      <View style={styles.header}>
        {/* + icon */}
        {/* Arrow head/ Paper plane icon */}
        {/* Receive icon */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#232323",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
  },
  balanceDiv: {
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "#111111",
  },
  balance: { fontSize: 2, color: "#FFFFF2", fontWeight: "semibold" },
});
