import React from "react";
import { Card, Paragraph, Text, Snackbar, Tooltip } from "react-native-paper";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const ModalCopyableCard = ({
  text,
  titleText,
}: {
  text: string;
  titleText: string;
}) => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.titleText}>{titleText}</Text>
      <Card
        style={styles.cardContainer}
        theme={{ colors: { surface: "black" } }}
      >
        <Card.Content style={styles.cardContent}>
          <Paragraph style={styles.text}>{text}</Paragraph>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome6
              name="copy"
              size={24}
              style={styles.icon}
              onPress={onToggleSnackBar}
            />
          </TouchableOpacity>
        </Card.Content>
      </Card>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={500}
        elevation={5}
        style={styles.snackbarContainer}
      >
        <Text style={styles.snackbarText}>Copied!</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "transparent",
  },
  cardContainer: {
    borderRadius: 15,
    margin: 10,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
  },
  snackbarContainer: {
    marginTop: "auto",
    color: "white",
    backgroundColor: "none",
  },
  cardContent: { flexDirection: "row" },
  titleText: {
    color: "white",
    textAlign: "left",
    marginLeft: 10,
    marginBottom: -5,
    marginTop: 15,
    fontWeight: "bold",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "left",
  },
  snackbarText: {
    color: "white",
    marginBottom: 50,
    marginLeft: "auto",
    left: 12,
  },
  icon: {
    color: "white",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
});

export default ModalCopyableCard;
