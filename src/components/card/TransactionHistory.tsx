import * as React from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type IconName = "check-circle" | "alert-circle";

interface Item {
  key: number;
  name: string;
  paymentStatus: string;
  amount: number;
  icon: IconName;
}

const MyComponent = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState<Item[]>([
    {
      key: 1,
      name: "Sending to Mary",
      paymentStatus: "Pending",
      amount: 16,
      icon: "alert-circle",
    },
    {
      key: 2,
      name: "Sent to Mother ❤️",
      paymentStatus: "Confirmed",
      amount: 93,
      icon: "check-circle",
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable style={{ marginTop: 10 }}>
      {items.slice(from, to).map((item) => (
        <DataTable.Row
          key={item.key}
          style={styles.rowStyling}
        >
          <Feather
            name={item.icon}
            size={24}
            color="black"
            style={styles.genericIcon}
          />
          <DataTable.Cell>
            <View>
              <Text style={styles.genericText}>{item.name}</Text>
              <Text style={styles.paymentStatus}>{item.paymentStatus}</Text>
            </View>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.genericText}>€{item.amount}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  rowStyling: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
    color: "white",
  },
  genericText: {
    color: "white",
    fontSize: 14,
  },
  genericIcon: {
    color: "white",
    marginRight: 10,
  },
  paymentStatus: {
    color: "grey",
    fontSize: 10,
  },
});

export default MyComponent;
