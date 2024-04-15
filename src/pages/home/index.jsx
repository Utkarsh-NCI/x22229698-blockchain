// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useMetaMask } from "../../hooks/useMetaMask";
import styles from "./home.module.css";
import Nav from "../../components/navbar";
import { useMessage } from "../../hooks/useMessage";
import { ABI, ContractAddress, formatAddress } from "../../utils";
import Web3 from "web3";

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
    // window.ethereum.request({
    //   method: "wallet_revokePermissions",
    //   params: [
    //     {
    //       eth_accounts: {},
    //     },
    //   ],
    // });
  }, []);

  const connectContract = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, ContractAddress);
    console.log(isConnecting, window.ethereum?.isMetaMask, wallet.accounts);
    const tx = await contract.methods
      .listItem(web3.utils.toWei("10", "ether"), 130, "haha")
      .send({
        from: wallet.accounts[0],
      });

    console.log(tx);
    const tx1 = await contract.methods.buyItem(7, 10).send({
      from: wallet.accounts[0],
    });

    console.log(tx1);
    // document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
  };

  useEffect(() => {
    connectContract();
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
