import { Wallet, StellarConfiguration, SigningKeypair, IssuedAssetId, PublicKeypair } from "@stellar/typescript-wallet-sdk";


import * as Crypto from 'expo-crypto';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

export async function generateRandomKeypair() {
    let wallet = new Wallet({
      stellarConfiguration: StellarConfiguration.TestNet(),
    });
    const account = wallet.stellar().account();
    const bytes = Crypto.getRandomBytes(32);
    return account.createKeypairFromRandom(Buffer.from(bytes));
  }


  /* --Key API-- */
  const storeKey = async (value: string) => {
    try {
      await AsyncStorage.setItem('pk', value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const storeAddress = async (value: string) => {
    try {
      await AsyncStorage.setItem
      ('address', value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  const getAddress = async () => {
    try {
      const address = await AsyncStorage.getItem('address');
      if (address !== null) {
        return address;
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }

  const getKey = async () => {
    try {
      const value = await AsyncStorage.getItem('pk');
      if (value !== null) {
        const key = SigningKeypair.fromSecret(value);
        return key;
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  /* --Account API-- */
  export async function handlerCreateAccount() {

    // This parent account will be on server side
      const parentAccount = SigningKeypair.fromSecret(
        "SAZLMMQW7FFYYJH5SIFVCEZWW6DSFU2MY3XQBPTGYLCHP5WAOEAVVFRN"
      );
      const childAccount = await generateRandomKeypair();
      await storeKey(childAccount.toString());
      await storeAddress(childAccount.publicKey);

      console.log('PUBLICKEY: '+childAccount.publicKey);

      let wallet = new Wallet({
        stellarConfiguration: StellarConfiguration.TestNet(),
      });

      const txBuilder = await wallet.stellar().transaction({
        sourceAddress: parentAccount,
      });

      const tx = txBuilder.createAccount(childAccount).build();


      parentAccount.sign(tx);

      await wallet.stellar().submitTransaction(tx);

      // TODO - Create user server side

     /* ADD USDC to Trustline */
      const asset = new IssuedAssetId(
        "USDC",
        "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
      );

      const addUSDCtx = txBuilder.addAssetSupport(asset).build();

      childAccount.sign(addUSDCtx);
      await wallet.stellar().submitTransaction(addUSDCtx);


  }

async function handleCreateAccountWithSponsor() {
    // Third-party key that will sponsor creating new account
    const zappKeyPair: PublicKeypair = PublicKeypair.fromPublicKey("GC5GD...");
    const newAccount = await generateRandomKeypair();

    let wallet = new Wallet({
        stellarConfiguration: StellarConfiguration.TestNet(),
      });

    const txBuilder = await wallet.stellar().transaction({
        sourceAddress: zappKeyPair,
      });

    const createTxn = txBuilder.createAccount(newAccount).build();

    const xdrString = createTxn.toXDR();

    //TODO - Send xdrString to server to be signed by server key

    // TODO - Decode server response
    //const signedTransaction = stellar.decodeTransaction(xdrStringFromBackend);

    //  await wallet.stellar().submitTransaction(signedTransaction);
}

export async function getBalance(){

    //const address = await getAddress();

   // if (address){
    let wallet = new Wallet({
        stellarConfiguration: StellarConfiguration.TestNet(),
      });

    const server = wallet.stellar().server;
    const balances = await server.loadAccount('GAYQQKYHTU6VK4KDC7VXPCH2JQ6GKDBHTW4OC3UOTXESW7XNVDNSHBOT');

    console.log(balances);

    for (const balance of balances.balances) {
        console.log(balance);
      }
 //  }

}

 export async function getTransactionHistory(){
    const address = await getAddress();

    if (address){
    let wallet = new Wallet({
        stellarConfiguration: StellarConfiguration.TestNet(),
      });

    const server = wallet.stellar().server;

    const stellarTransaction = await server
    .transactions()
    .forAccount(address)
    .call();

    console.log(stellarTransaction);
  }

  }

  // This function should call the approve function from the Stellar USDC contract
  export async function sendRemittance(alias: string, amount: number){

    // TODO - Get recipient address from server via alias
    const recipient = 'GAYQQKYHTU6VK4KDC7VXPCH2JQ6GKDBHTW4OC3UOTXESW7XNVDNSHBOT';
    const address = await getAddress();

    const {
      Contract,
      SorobanRpc,
      Networks,
      BASE_FEE,
    } = require("@stellar/stellar-sdk");

    const server = new SorobanRpc.Server(
      "https://soroban-testnet.stellar.org:443",
    );

    const contractAddress =
    "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA";
    const contract = new Contract(contractAddress);

    let key = await getKey();

    console.log('KEY: '+key);
    console.log('ADDRESS: '+address);

    if (key && address){
    let wallet = new Wallet({
      stellarConfiguration: StellarConfiguration.TestNet(),
    });

    const txBuilder = await wallet.stellar().transaction({
      sourceAddress: key,
    });

    const tx =txBuilder.addOperation(contract.call("approve",{address, recipient, amount})).build();

    const response = await wallet.stellar().submitTransaction(tx);

    if (response){
      console.log('Transaction Approved');
    }else{
      console.log('Transaction Failed');
    }
  }
}


  // Required Functionality

  /* --Create, Encrypt and Store Secret Key-- */

  /* --Approve a USDC remittance transaction-- */

  /* --  -- */