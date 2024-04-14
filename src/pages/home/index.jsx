// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useMetaMask } from "../../hooks/useMetaMask";
import styles from "./home.module.css";
import Nav from "../../components/navbar";
import { useMessage } from "../../hooks/useMessage";

const Home = () => {
  const {
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    errorMessage,
    clearError,
  } = useMetaMask();

  const { setMsgColor } = useMessage();

  useEffect(() => {
    if (errorMessage) {
      setMsgColor(errorMessage, "red");
    }
    return () => {
      clearError();
    };
  }, [errorMessage, setMsgColor, clearError]);

  useEffect(() => {
    window.ethereum.request({
      method: "wallet_revokePermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  }, []);

  return (
    <div className={styles.rightNav}>
      <Nav></Nav>
      {!hasProvider && (
        <a href="https://metamask.io" target="_blank">
          Install MetaMask
        </a>
      )}
      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <button disabled={isConnecting} onClick={connectMetaMask}>
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default Home;
