import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import { NavigationType } from "../type/screenType";
import { RouteProp } from "@react-navigation/native";
import { useBalance } from "../context/BalanceContext";
import { sendPayment } from "../services/stellarWalletSdk";

type RouteType = RouteProp<{ SendScreen: { recipient: string } }, "SendScreen">;

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const SendScreen = () => {
  const [amount, setAmount] = useState<string>("");
  const [switchEnabled, setSwitchEnabled] = useState<boolean>(false);
  const [sending, setSending] = useState(false);
  const {balance} = useBalance();
  const toggleSwitch = () =>
    setSwitchEnabled((previousState) => !previousState);

  const navigation = useNavigation<NavigationType>();
  const route = useRoute<RouteType>();

  const handleSendPayment = async (recipient: any, amount: any) => {
    setSending(true);
    console.log('Sending payment:', recipient, amount);
    try {
      const result = await sendPayment(recipient, amount)
      if (result?.success) {
        console.log('Payment successful:', result);
        navigation.navigate("SendConfirmationScreen", { amount, recipient })
      } else {
        throw new Error("Error sending payment");
      }
    } catch (error) {
      console.error('Error sending payment:', error);
    } finally {
      setSending(false);
    }
  }
    
  const recipient = route.params?.recipient || "";

  const handlePress = (num: string) => {
    if (num === "." && amount.includes(".")) return;

    if (num !== "." && amount.includes(".")) {
      const parts = amount.split(".");
      if (parts[1].length >= 2) return;
    }

    setAmount(amount + num);
  };

  const handleBack = () => {
    setAmount(amount.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHalfContainer}>
        <Text style={styles.titleText}>Sending to +{recipient}</Text>
        <View style={styles.switchContainer}>
          <MaterialCommunityIcons
            name={"lightning-bolt"}
            size={30}
            color={switchEnabled ? "yellow" : "grey"}
          />
          <Switch
            trackColor={{ false: "#767577", true: "#959578" }}
            thumbColor={switchEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={switchEnabled}
          />
        </View>
        {switchEnabled ? (
          <Text style={styles.subText}>Zapping fees away!</Text>
        ) : null}
        <View style={styles.display}>
          <View style={styles.amountContainer}>
            <Text style={styles.text}>€ {amount}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <FontAwesome
                name="send"
                style={{
                  ...styles.sendIcon,
                  color: switchEnabled
                    ? Number(balance) < Number(amount)
                      ? "grey"
                      : "yellow"
                    : "white",
                }}
                onPress={async () =>
                  switchEnabled
                    ? await handleSendPayment(recipient, amount)
                    : navigation.navigate("IbanScreen", { amount: amount })
                }
                disabled={switchEnabled ? Number(balance) < Number(amount) : false}
              />
            </TouchableOpacity>
          </View>
        </View>
        {switchEnabled ? (
          <Text
            style={{
              ...styles.titleText,
              position: "absolute",
              bottom: 0.5,
            }}
          >
            Account Balance: €{balance}
          </Text>
        ) : null}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(".")}
        >
          <Text style={styles.buttonText}>.</Text>
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
  topHalfContainer: {
    height: screenHeight * 0.5,
    width: screenWidth,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignContent: "flex-start",
    alignItems: "flex-start",
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
    alignSelf: "center",
  },
  subText: {
    color: "grey",
    fontSize: 10,
    alignSelf: "center",
    marginLeft: "auto",
    position: "absolute",
    right: 0,
    top: 65,
  },
  text: {
    alignItems: "center",
    color: "white",
    fontSize: 40,
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
  buttonText: {
    color: "white",
    fontSize: 24,
  },
  sendIcon: {
    color: "white",
    fontSize: 20,
    borderColor: "white",
  },
});

export default SendScreen;
