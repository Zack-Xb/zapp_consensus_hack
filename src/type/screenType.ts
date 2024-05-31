import { StackNavigationProp } from "@react-navigation/stack";

type ScreenStackParamList = {
  Home: undefined;
  TopUpScreen: undefined;
  SendScreen: { recipient: string };
  ToScreen: undefined;
  ReceiveScreen: undefined;
  IbanScreen: { amount: string };
  SendConfirmationScreen: { amount: string; recipient: string };
};

export type NavigationType = StackNavigationProp<
  ScreenStackParamList,
  | "ToScreen"
  | "Home"
  | "TopUpScreen"
  | "IbanScreen"
  | "ReceiveScreen"
  | "SendScreen"
  | "SendConfirmationScreen"
>;
