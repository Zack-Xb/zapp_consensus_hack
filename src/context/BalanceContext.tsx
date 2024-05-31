import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { getBalance } from '../services/stellarWalletSdk';

interface BalanceContextProps {
  balance: string;  // Ensure balance is a string to avoid floating point arithmetic issues
  isLoading: boolean; 
  loadBalance: () => void;
}

const BalanceContext = createContext<BalanceContextProps>({
  balance: '0.00',  // Initial balance for consistency
  isLoading: false,
  loadBalance: () => { },
});

export const useBalance = () => useContext(BalanceContext);

interface BalanceProviderProps {
  children: ReactNode;
}

export const BalanceProvider = ({ children }: BalanceProviderProps) => {
  const [balance, setBalance] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadBalance = useCallback(async () => {
    setIsLoading(true);
    // wait 3 secs
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
      const usdcBalance = await getBalance('USDC');
      if (!usdcBalance) {
        throw new Error('Failed to get balance');
      }
      const formattedBalance = parseFloat(usdcBalance).toFixed(2);  // Format balance to two decimal places
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Failed to load balance:', error);
      setBalance('0.00');  // Ensure balance is reset to 0.00 on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  return (
    <BalanceContext.Provider value={{ balance, loadBalance, isLoading }}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceContext;
