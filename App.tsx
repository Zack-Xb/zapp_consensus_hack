import { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  BalanceProvider } from "./src/context/BalanceContext";

// Components
import Loading from "./src/screens/StartScreen";
import Home from "./src/screens/Home";
import TopUpScreen from "./src/screens/TopUpScreen";
import SendScreen from "./src/screens/SendScreen";
import ReceiveScreen from "./src/screens/ReceiveScreen";
import ToScreen from "./src/screens/ToScreen";
import IbanScreen from "./src/screens/IbanScreen";
import SendConfirmationScreen from "./src/screens/SendConfirmationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BalanceProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen
            name="Loading"
            component={Loading}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="TopUpScreen"
            component={TopUpScreen}
          />
          <Stack.Screen
            name="ToScreen"
            component={ToScreen}
          />
          <Stack.Screen
            name="SendScreen"
            component={SendScreen}
          />
          <Stack.Screen
            name="ReceiveScreen"
            component={ReceiveScreen}
          />
          <Stack.Screen
            name="IbanScreen"
            component={IbanScreen}
          />
          <Stack.Screen
            name="SendConfirmationScreen"
            component={SendConfirmationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BalanceProvider>
    // <RootSiblingParent>
    //   <PaperProvider>
    //     <View style={styles.container}>
    //       <ChoiceModal />
    //       {isLoading ? (
    //         <ImageViewer src="/assets/zapp-icon.svg" />
    //       ) : (
    //         <>
    //           <ImageViewer
    //             src={
    //               "https://docs.expo.dev/static/images/tutorial/background-image.png"
    //             }
    //           />
    //           <Text style={styles.text}>Zapp the fees away!</Text>
    //           <CtaButton
    //             label="Get Started"
    //             setOpen={setOpen}
    //             choice={true}
    //           />
    //         </>
    //       )}
    //       <StatusBar style="light" />
    //     </View>
    //   </PaperProvider>
    // </RootSiblingParent>
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
