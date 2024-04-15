// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useMetaMask } from "../../hooks/useMetaMask";
import styles from "./home.module.css";
import Nav from "../../components/navbar";
import { ABI, ContractAddress } from "../../utils";
import Web3 from "web3";
import { useState } from "react";
import Item from "../../components/Item";
import { useMessage } from "../../hooks/useMessage";

const Home = () => {
  const { wallet } = useMetaMask();
  const [items, setItems] = useState([]);
  const { setMsgColor } = useMessage();

  const buy = async (id) => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, ContractAddress);
    const itemData = await contract.methods.items(id).call();
    console.log(itemData);
    const tx1 = await contract.methods
      .buyItems(id, itemData.seller)
      .send({
        from: wallet.accounts[0],
        gas: 6721975,
        value: itemData.price,
      })
      .catch((e) => {
        setMsgColor(e.message, "red");
      });
  };

  const fetchAllItems = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ABI, ContractAddress);
      const itemsList = await contract.methods.getItems().call();
      setItems(itemsList);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <div className={styles.rootContainer}>
      <div className={styles.items}>
        {items.map((_item) => (
          <Item
            key={_item.imgURI}
            desc={_item.desc}
            imgURI={_item.imgURI}
            fallbackImageURI={_item.fallbackimageURI}
            price={_item.price}
            id={Number(_item.id)}
            buy={buy}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
