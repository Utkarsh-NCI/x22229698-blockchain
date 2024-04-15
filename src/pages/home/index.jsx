// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useMetaMask } from "../../hooks/useMetaMask";
import styles from "./home.module.css";
import Nav from "../../components/navbar";
import { ABI, ContractAddress } from "../../utils";
import Web3 from "web3";
import { useState } from "react";
import Item from "../../components/Item";

const Home = () => {
  const { wallet } = useMetaMask();
  const [items, setItems] = useState([]);

  const connectContract = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, ContractAddress);
    const tx = await contract.methods
      .listItem(web3.utils.toWei("10", "ether"), 130, "haha")
      .send({
        from: wallet.accounts[0],
      });

    const tx1 = await contract.methods.buyItem(7, 10).send({
      from: wallet.accounts[0],
      gas: 6721975,
    });
    console.log(tx1);
    // document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
  };

  const buy = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, ContractAddress);
    const itemData = await contract.methods.items(0).call();
    console.log(itemData);
    const tx1 = await contract.methods.buyItems(10, itemData.seller).send({
      from: wallet.accounts[0],
      gas: 6721975,
      value: itemData.price,
    });

    console.log(tx1);
  };
  const list = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, ContractAddress);
    const tx = await contract.methods
      .listItem(web3.utils.toWei("11", "ether"), 131, "haha")
      .send({
        gas: 6721975,
        from: wallet.accounts[0],
      });
    console.log(tx);
  };

  const fetchAllItems = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ABI, ContractAddress);
      const itemsList = await contract.methods.getItems().call();
      setItems(itemsList);
      console.log(itemsList);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <div className={styles.rootContainer}>
      <button onClick={buy}>buy</button>
      <button onClick={list}>list</button>
      <div className={styles.items}>
        {items.map((_item) => (
          <Item key={_item.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
