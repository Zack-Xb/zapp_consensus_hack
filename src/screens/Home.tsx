import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { NavigationType } from "../type/screenType";
import { BalanceContext } from "../context/BalanceContext";
import ReferFriend from "../components/card/ReferFriend";
import TransactionHistory from "../components/card/TransactionHistory";

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const { balance, setBalance } = React.useContext(BalanceContext);
  const navigation = useNavigation<NavigationType>();

  return (
    <View style={styles.container}>
      {/* This is a row comprised of profile icon ( left ) and Qr code + Help icon (right) */}
      <View style={styles.header}>
        {/* Profile icon */}
        <FontAwesome
          name="user-circle-o"
          size={24}
          color="#A9A9A9"
        />
        <View style={styles.rightHeader}>
          {/* QR Code icon */}
          <FontAwesome
            name="qrcode"
            size={24}
            color="#A9A9A9"
          />
          {/* Help icon */}
          <MaterialCommunityIcons
            name="help-circle"
            size={24}
            color="#A9A9A9"
          />
        </View>
      </View>

      {/* Balance Box */}
      <ImageBackground
        source={require("../../assets/home.png")}
        style={styles.imageBackground}
        resizeMode="contain"
      >
        <View style={styles.balanceDiv}>
          <Text style={styles.dollarSign}>$ </Text>
          <Text style={styles.balanceText}>{Number(balance).toFixed(2)}</Text>
        </View>
      </ImageBackground>

      <View style={styles.rowDisplay}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TopUpScreen");
            }}
          >
            <Fontisto
              name="plus-a"
              size={30}
              color="grey"
              style={styles.iconContainer}
            />
          </TouchableOpacity>
          <Text style={styles.iconText}>Top Up</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ToScreen");
            }}
          >
            <FontAwesome
              name="send"
              size={30}
              color="grey"
              style={styles.iconContainer}
            />
          </TouchableOpacity>
          <Text style={styles.iconText}>Send</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ReceiveScreen");
            }}
          >
            <FontAwesome6
              name="hand-holding-dollar"
              size={30}
              color="grey"
              style={styles.iconContainer}
            />
          </TouchableOpacity>
          <Text style={styles.iconText}>Receive</Text>
        </View>
      </View>

      <ReferFriend />
      <TransactionHistory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    // flexDirection: "column",
    backgroundColor: "black",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  rightHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowDisplay: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  balanceDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  dollarSign: {
    color: "darkgreen",
    fontSize: 30,
    fontWeight: "bold",
  },
  balanceText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  iconText: {
    color: "#A9A9A9",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  imageBackground: {
    width: screenWidth,
    height: 200,
  },
});
