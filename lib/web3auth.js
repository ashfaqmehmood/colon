import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import * as Linking from "expo-linking";

const redirectUrl = Linking.createURL("auth", { scheme: "colon" }); // replace with your own scheme

const clientId =
  "BFp_GoRMSHV_6Dj5t9ztSBKRNfQvzQc21AVgYDs7zSD-0w06cJb00GypzJvv1WVcA3I53wK15SCIjCqch_0Bgww";
// Secure it in production

let web3auth;

export const initializeWeb3Auth = async () => {
  if (!web3auth) {
    web3auth = new Web3Auth(WebBrowser, SecureStore, {
      clientId,
      network: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET,
      redirectUrl,
    });
    await web3auth.init();
  }
  return web3auth;
};

export const login = async (loginProvider) => {
  let userInfo = null;
  try {
    const web3authInstance = await initializeWeb3Auth();
    await web3authInstance.login({ loginProvider, redirectUrl: redirectUrl });
    userInfo = await web3authInstance.userInfo();
    return { userInfo, privKey: web3authInstance.privKey };
  } catch (error) {
    console.log(userInfo);
    console.warn("Login error in login function:", error);
    return null;
  }
};

export const logout = async () => {
  const web3authInstance = await initializeWeb3Auth();
  await web3authInstance.logout();
};

export const getUser = async () => {
  const web3authInstance = await initializeWeb3Auth();
  if (web3authInstance.privKey) {
    const userInfo = await web3authInstance.userInfo();
    return { userInfo, privKey: web3authInstance.privKey };
  }
  return null;
};
