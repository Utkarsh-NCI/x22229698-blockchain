// eslint-disable-next-line no-unused-vars
import React from "react";
import { useMetaMask } from "../../hooks/useMetaMask";
import { formatAddress } from "../../utils";
import styles from "./home.module.css";

const Home = () => {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  return (
    <div className={styles.rightNav}>
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
      {hasProvider && wallet.accounts.length > 0 && (
        <a
          className="text_link tooltip-bottom"
          href={`https://etherscan.io/address/${wallet.accounts[0]}`}
          target="_blank"
          data-tooltip="Open in Block Explorer"
        >
          {formatAddress(wallet.accounts[0])}
        </a>
      )}
    </div>
  );
};

export default Home;
