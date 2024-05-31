import { generateRandomKeypair, handlerCreateAccount, getBalance, getTransactionHistory, sendRemittance } from "../services/stellarWalletSdk";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

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
}, 10000);

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
