import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal, PaperProvider } from "react-native-paper";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/core";
import { RouteProp } from "@react-navigation/native";
import { NavigationType } from "../type/screenType";

type RouteType = RouteProp<
  { SendConfirmationScreen: { amount: string; recipient: string } },
  "SendConfirmationScreen"
>;

const SendConfirmationScreen = () => {
  const [showModal, setShowModal] = useState(true);

  const navigation = useNavigation<NavigationType>();
  const route = useRoute<RouteType>();
  const amount = route.params?.amount || 0;
  const recipient = route.params?.recipient || "";

  const hideDialog = () => setShowModal(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Dialog
            visible={showModal}
            onDismiss={hideDialog}
            style={styles.dialogContainer}
          >
            <Dialog.Title style={styles.titleText}>
              Transaction Sent
            </Dialog.Title>
            <Dialog.Content>
              <Text style={styles.subText}>
                Your transaction of{" "}
                <Text style={{ fontWeight: "bold" }}>${amount}</Text> is
                currently on its way to {recipient}.
              </Text>
              <Ionicons
                name="checkmark-circle-outline"
                style={styles.icon}
              />
              <Text></Text>
            </Dialog.Content>
            <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
              <Button
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                Back to Home
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#232323",
  },
  dialogContainer: {
    flex: 1,
    display: "flex",
    backgroundColor: "black",
    marginBottom: 100,
    marginTop: 40,
    padding: 40,
  },
  titleText: {
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    justifyContent: "center",
  },
  subText: {
    color: "white",
    textAlign: "left",
    justifyContent: "center",
  },
  icon: {
    color: "green",
    fontSize: 120,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default SendConfirmationScreen;
