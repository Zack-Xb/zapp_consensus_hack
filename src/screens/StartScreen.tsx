import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { NavigationType } from "../type/screenType";

// Components
import { useState, useEffect } from "react";

export default function StartScreen() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<NavigationType>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleOpenModal = () => {
    setOpen(true);
  };

  function ChoiceModal() {
    return (
      <Modal
        visible={open}
        animationType="slide"
      >
        <View style={styles.container}>
          {/* <Text style={styles.text}>Zapp the fees away!</Text>
          <CtaButton
            label="Close"
            setOpen={setOpen}
            choice={false}
          />
          <StatusBar style="auto" /> */}
        </View>
      </Modal>
    );
  }

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <ChoiceModal />
        {isLoading ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../../assets/zapp-icon.png")}
              resizeMode="contain"
            />
            <ActivityIndicator
              size="large"
              color="white"
            />
          </View>
        ) : (
          <>
            <Image
              source={require("../../assets/zapp-icon.png")}
              resizeMode="contain"
            />
            <Text style={styles.text}> Zapp the fees away!</Text>
            {/* <CtaButton
              label="Get Started"
              setOpen={setOpen}
              choice={true}
            /> */}
            <Button
              onPress={() => {
                navigation.navigate("Home");
              }}
              children="Get Started"
            />
          </>
        )}
        <StatusBar style="light" />
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
  imageBox: {
    width: "60%",
    height: "50%",
    borderRadius: 10,
  },
  modal: {
    backgroundColor: "#B9B48D",
    borderRadius: 15,
    height: "75%",
    alignSelf: "center",
  },
});
