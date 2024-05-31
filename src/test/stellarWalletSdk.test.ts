import { generateRandomKeypair, handlerCreateAccount, getBalance,getTransactionHistory, sendRemittance,addAssets, testApprove, sendPayment } from "../services/stellarWalletSdk";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { Keypair, SigningKeypair } from "@stellar/typescript-wallet-sdk";

test("generateRandomKeypair", async () => {
    const response = await generateRandomKeypair();

    console.log(response);
    expect(response).toBeDefined();
});

test("handlerCreateAccount", async () => {
    const response = await handlerCreateAccount();

    console.log(response);
    expect(AsyncStorage.setItem).toBeCalledWith('pk');
    expect(response).toBeDefined();
}, 30000);

test("getBalance", async () => {
    const response = await getBalance();

    console.log(response);
    expect(response).toBeDefined();
});

test("getTransactionHistory", async () => {
    const response = await getTransactionHistory();

    console.log(response);
    expect(response).toBeDefined();
});

test("sendRemittance", async () => {
    const response = await sendRemittance('77042647', 100);

    console.log(response);
    expect(response).toBeDefined();
})

test("addAssets", async () => {
    const sourceKeypair = SigningKeypair.fromSecret(
        "SAA3YYCCGVX7N6SJID2I7XBS2ZIS6NKQFTZ6SIZHQGGX6IF3N2M2EHJL",
      );

    const response = await addAssets(sourceKeypair);

    console.log(response);
    expect(response).toBeDefined();
},100000)

test("testApprove", async () => {
    const response = await testApprove(2);

    console.log(response);
    expect(response).toBeDefined();
},100000)

test("sendPayment", async () => {
    const response = await sendPayment('863198', 2, 'USDC');

    console.log(response);
},40000);