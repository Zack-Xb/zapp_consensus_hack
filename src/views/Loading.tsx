import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Modal, Platform } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { PaperProvider } from "react-native-paper";

// Components
import ImageViewer from "../../src/components/ImageViewer";
import CtaButton from "../../src/components/buttons/CTA";
import { useState, useEffect } from "react";

export default function Loading() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      <PaperProvider>
        <View style={styles.container}>
          <ChoiceModal />
          {isLoading ? (
            <ImageViewer src="/assets/zapp-icon.svg" />
          ) : (
            <>
              <ImageViewer
                src={
                  "https://docs.expo.dev/static/images/tutorial/background-image.png"
                }
              />
              <Text style={styles.text}>Zapp the fees away!</Text>
              <CtaButton
                label="Get Started"
                setOpen={setOpen}
                choice={true}
              />
            </>
          )}
          <StatusBar style="light" />
        </View>
      </PaperProvider>
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
