import { Wallet, StellarConfiguration, SigningKeypair, IssuedAssetId, PublicKeypair } from "@stellar/typescript-wallet-sdk";
import { Asset, Operation } from "@stellar/stellar-sdk";

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
      console.log('PrivateKEY: '+childAccount.secretKey);

      let wallet = new Wallet({
        stellarConfiguration: StellarConfiguration.TestNet(),
      });

      const txBuilder = await wallet.stellar().transaction({
        sourceAddress: parentAccount,
      });

      const tx = txBuilder.createAccount(childAccount, 200).build();


      parentAccount.sign(tx);

      await wallet.stellar().submitTransaction(tx);

      // TODO - Create user server side

      await addAssets(childAccount);
  }


  // Initialize the user's wallet with a USDC and EURC trustline
  export async function addAssets(childAccount: SigningKeypair){

    let wallet = new Wallet({
      stellarConfiguration: StellarConfiguration.TestNet(),
    });

    const childTxBuilder = await wallet.stellar().transaction({
      sourceAddress: childAccount,
    });

   /* ADD USDC to Trustline */
    const usdc = new IssuedAssetId(
      "USDC",
      "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
    );

    const eurc = new IssuedAssetId(
      "EURC",
      "GB3Q6QDZYTHWT7E5PVS3W7FUT5GVAFC5KSZFFLPU25GO7VTC3NM2ZTVO",
    );

    const addUSDCtx = childTxBuilder.addAssetSupport(usdc).build();

    childAccount.sign(addUSDCtx);
    await wallet.stellar().submitTransaction(addUSDCtx);

    const addEURCtx = childTxBuilder.addAssetSupport(eurc).build();

    childAccount.sign(addEURCtx);
    await wallet.stellar().submitTransaction(addEURCtx);
  }


  // For Later
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

 return balances;

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

export async function testApprove(amount: number) {

  const spender = 'GAYQQKYHTU6VK4KDC7VXPCH2JQ6GKDBHTW4OC3UOTXESW7XNVDNSHBOT';

  // TODO - Get owner address from async storage
  const owner = 'GBCZU36B3D7IEW7AWSXRO45QUZM67QU4KGT42YC66OLKPS7EERZOF6YK';


  const {
    Keypair,
    Contract,
    SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
  } = require("@stellar/stellar-sdk");

  // The source account will be used to sign and send the transaction.
   // TODO - Get owner key from async storage
  const sourceKeypair = Keypair.fromSecret(
    "SAA3YYCCGVX7N6SJID2I7XBS2ZIS6NKQFTZ6SIZHQGGX6IF3N2M2EHJL",
  );

  const publicKey = sourceKeypair.publicKey;

  // Configure SorobanClient to use the `soroban-rpc` instance of your
  // choosing.
  const server = new SorobanRpc.Server(
    "https://soroban-testnet.stellar.org:443",
  );

  // Here we will use a deployed instance of the `increment` example contract.
  const contractAddress =
    "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA";
  const contract = new Contract(contractAddress);

  // Transactions require a valid sequence number (which varies from one
  // account to another). We fetch this sequence number from the RPC server.
  const sourceAccount = await server.getAccount(sourceKeypair.publicKey());

  // The transaction begins as pretty standard. The source account, minimum
  // fee, and network passphrase are provided.
  let builtTransaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    // The invocation of the `increment` function of our contract is added
    // to the transaction. Note: `increment` doesn't require any parameters,
    // but many contract functions do. You would need to provide those here.
    // This transaction will be valid for the next 30 seconds
    .addOperation(contract.call("approve",{from: owner,spender: spender, amount: amount,live_until_ledger: 2887830 }))
    .setTimeout(30)
    .build();

  //console.log(`builtTransaction=${builtTransaction.toXDR()}`);

  // We use the RPC server to "prepare" the transaction. This simulating the
  // transaction, discovering the storage footprint, and updating the
  // transaction to include that footprint. If you know the footprint ahead of
  // time, you could manually use `addFootprint` and skip this step.
  //let preparedTransaction = await server.prepareTransaction(builtTransaction);

  // Sign the transaction with the source account's keypair.
  builtTransaction.sign(sourceKeypair);

  // Let's see the base64-encoded XDR of the transaction we just built.
  console.log(
    `Signed prepared transaction XDR: ${builtTransaction
      .toEnvelope()
      .toXDR("base64")}`,
  );

  // Submit the transaction to the Soroban-RPC server. The RPC server will
  // then submit the transaction into the network for us. Then we will have to
  // wait, polling `getTransaction` until the transaction completes.
  try {
    let sendResponse = await server.sendTransaction(builtTransaction);
    console.log(`Sent transaction: ${JSON.stringify(sendResponse)}`);

    if (sendResponse.status === "PENDING") {
      let getResponse = await server.getTransaction(sendResponse.hash);
      // Poll `getTransaction` until the status is not "NOT_FOUND"
      while (getResponse.status === "NOT_FOUND") {
        console.log("Waiting for transaction confirmation...");
        // See if the transaction is complete
        getResponse = await server.getTransaction(sendResponse.hash);
        // Wait one second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      console.log(`getTransaction response: ${JSON.stringify(getResponse)}`);

      if (getResponse.status === "SUCCESS") {
        // Make sure the transaction's resultMetaXDR is not empty
        if (!getResponse.resultMetaXdr) {
          throw "Empty resultMetaXDR in getTransaction response";
        }
        // Find the return value from the contract and return it
        let transactionMeta = getResponse.resultMetaXdr;
        let returnValue = transactionMeta.v3().sorobanMeta().returnValue();
        console.log(`Transaction result: ${returnValue.value()}`);
      } else {
        throw `Transaction failed: ${getResponse.resultXdr.toString()}`;
      }
    } else {
      throw sendResponse.errorResultXdr;
    }
  } catch (err) {
    // Catch and report any errors we've thrown
    console.log("Sending transaction failed");
    console.log(JSON.stringify(err));
  }
}


export async function sendPayment(phone: string, amount: number){
  const recipient = '';

  // get Key - Later
  // get Address - Later

  const {
    Keypair,
    Contract,
    SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
  } = require("@stellar/stellar-sdk");

  // The source account will be used to sign and send the transaction.
  // GCWY3M4VRW4NXJRI7IVAU3CC7XOPN6PRBG6I5M7TAOQNKZXLT3KAH362
  const sourceKeypair = Keypair.fromSecret(
    "SAZLMMQW7FFYYJH5SIFVCEZWW6DSFU2MY3XQBPTGYLCHP5WAOEAVVFRN",
  );

  const publicKey = sourceKeypair.publicKey;

  // Configure SorobanClient to use the `soroban-rpc` instance of your
  // choosing.
  const server = new SorobanRpc.Server(
    "https://soroban-testnet.stellar.org:443",
  );

  // Here we will use a deployed instance of the `increment` example contract.
  const contractAddress =
    "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";
  const contract = new Contract(contractAddress);

  // Transactions require a valid sequence number (which varies from one
  // account to another). We fetch this sequence number from the RPC server.
  const sourceAccount = await server.getAccount(sourceKeypair.publicKey());

  // The transaction begins as pretty standard. The source account, minimum
  // fee, and network passphrase are provided.
  let builtTransaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    // The invocation of the `increment` function of our contract is added
    // to the transaction. Note: `increment` doesn't require any parameters,
    // but many contract functions do. You would need to provide those here.
    // This transaction will be valid for the next 30 seconds
    .addOperation(Operation.payment({destination: recipient, asset: Asset.native() , amount: amount.toString()}))
    .setTimeout(30)
    .build();

  console.log(`builtTransaction=${builtTransaction.toXDR()}`);

  // We use the RPC server to "prepare" the transaction. This simulating the
  // transaction, discovering the storage footprint, and updating the
  // transaction to include that footprint. If you know the footprint ahead of
  // time, you could manually use `addFootprint` and skip this step.
  //let preparedTransaction = await server.prepareTransaction(builtTransaction);

  // Sign the transaction with the source account's keypair.
  builtTransaction.sign(sourceKeypair);

  // Let's see the base64-encoded XDR of the transaction we just built.
  console.log(
    `Signed prepared transaction XDR: ${builtTransaction
      .toEnvelope()
      .toXDR("base64")}`,
  );

  // Submit the transaction to the Soroban-RPC server. The RPC server will
  // then submit the transaction into the network for us. Then we will have to
  // wait, polling `getTransaction` until the transaction completes.
  try {
    let sendResponse = await server.sendTransaction(builtTransaction);
    console.log(`Sent transaction: ${JSON.stringify(sendResponse)}`);

    if (sendResponse.status === "PENDING") {
      let getResponse = await server.getTransaction(sendResponse.hash);
      // Poll `getTransaction` until the status is not "NOT_FOUND"
      while (getResponse.status === "NOT_FOUND") {
        console.log("Waiting for transaction confirmation...");
        // See if the transaction is complete
        getResponse = await server.getTransaction(sendResponse.hash);
        // Wait one second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      console.log(`getTransaction response: ${JSON.stringify(getResponse)}`);

      if (getResponse.status === "SUCCESS") {
        // Make sure the transaction's resultMetaXDR is not empty
        if (!getResponse.resultMetaXdr) {
          throw "Empty resultMetaXDR in getTransaction response";
        }
        // Find the return value from the contract and return it
        let transactionMeta = getResponse.resultMetaXdr;
        let returnValue = transactionMeta.v3().sorobanMeta().returnValue();
        console.log(`Transaction result: ${returnValue.value()}`);
      } else {
        throw `Transaction failed: ${getResponse.resultXdr.toString()}`;
      }
    } else {
      throw sendResponse.errorResultXdr;
    }
  } catch (err) {
    // Catch and report any errors we've thrown
    console.log("Sending transaction failed");
    console.log(JSON.stringify(err));
  }
}


  // Required Functionality

  /* --Create, Encrypt and Store Secret Key-- */

  /* --Approve a USDC remittance transaction-- */

  /* --  -- */