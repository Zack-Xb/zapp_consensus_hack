import { Wallet, StellarConfiguration, SigningKeypair } from "@stellar/typescript-wallet-sdk";
import { randomBytes } from 'react-native-randombytes';

export default function WalletView() { 
    function generateRandomKeypair() {
        let wallet = new Wallet({
          stellarConfiguration: StellarConfiguration.TestNet(),
        });
        const account = wallet.stellar().account();
        const bytes = randomBytes(32);
        return account.createKeypairFromRandom(Buffer.from(bytes));
      }
      
      async function handlerCreateAccount() {
          const parentAccount = SigningKeypair.fromSecret(
            "super-secret-seed-to-generate-parent-account-replace-me"
          );
          const childAccount = generateRandomKeypair();
      
          let wallet = new Wallet({
            stellarConfiguration: StellarConfiguration.TestNet(),
          });
          const txBuilder = await wallet.stellar().transaction({
            sourceAddress: parentAccount,
          });
          const tx = txBuilder.createAccount(childAccount).build();
          parentAccount.sign(tx);
          await wallet.stellar().submitTransaction(tx);
      }
    
    return (
        <>
            Hello
        </>
    )
}