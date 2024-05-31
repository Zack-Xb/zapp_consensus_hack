import React from "react";

export const BalanceContext = React.createContext({
  balance: 0,
  setBalance: (value: number) => {},
});
