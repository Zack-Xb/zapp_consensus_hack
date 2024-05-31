import * as React from "react";
import { Card, Text } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";

const ReferFriend = () => (
  <Card style={{ backgroundColor: "green", margin: 5 }}>
    <View style={styles.viewContainer}>
      <Image
        source={require("../../../assets/referral.png")}
        resizeMode="contain"
        style={{ height: 50, right: 10 }}
      />
      <Card.Content style={{ right: 15 }}>
        <Text
          variant="titleLarge"
          style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
        >
          Refer a friend to zapp!
        </Text>
        <Text
          style={{ color: "white", fontSize: 12 }}
          variant="bodyMedium"
        >
          Get a free month's subscription
        </Text>
      </Card.Content>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});

export default ReferFriend;
