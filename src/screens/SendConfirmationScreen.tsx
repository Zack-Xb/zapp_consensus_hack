import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal, PaperProvider } from "react-native-paper";
import { useState } from "react";
import ModalCopyableCard from "../components/modals/ModalCopyableCard";

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
              <ModalCopyableCard
                titleText="Nationality"
                text="Germany"
              />
              <ModalCopyableCard
                titleText="Account Number"
                text="87653151"
              />
              <ModalCopyableCard
                titleText="Routing Number"
                text="778899"
              />
              <Text style={styles.sub2Text}>
                Company Name:{" "}
                <Text style={styles.sub3Text}>Unlimit Crypto</Text>
              </Text>
              <Text></Text>
            </Dialog.Content>
            <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
              <Button
                onPress={() => {
                  navigation.goBack();
                }}
              >
                Back
              </Button>
              <Button
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                Done
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
    marginBottom: 20,
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
  sub2Text: {
    color: "white",
    textAlign: "left",
    fontSize: 10,
    marginLeft: 10,
    justifyContent: "center",
  },
  sub3Text: {
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 10,
    justifyContent: "center",
  },
});

export default SendConfirmationScreen;
