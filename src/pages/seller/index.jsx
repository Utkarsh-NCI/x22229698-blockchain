import React, { useState } from "react";
import style from "./seller.module.css";
import { Box, Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import { useMetaMask } from "../../hooks/useMetaMask";
import { useMessage } from "../../hooks/useMessage";
import Web3 from "web3";
import { ABI, ContractAddress } from "../../utils";

const Seller = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [fallbackURL, setFallbackURL] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const { wallet } = useMetaMask();
  const { setMsgColor } = useMessage();

  const list = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, ContractAddress);
    const tx = await contract.methods
      .listItem(
        web3.utils.toWei(price, "ether"),
        `https://ipfs.io/ipfs/${url}`,
        fallbackURL,
        desc,
        name
      )
      .send({
        gas: 6721975,
        from: wallet.accounts[0],
      })
      .catch((e) => {
        setMsgColor(e.message, "red");
      });
    console.log(tx);
  };

  return (
    <div className={style.rootContainer}>
      <div className={style.form}>
        <Flex direction="column" gap="3" pt={"10%"} pl={"30%"}>
          <Box maxWidth="600px">
            <TextField.Root
              size="3"
              placeholder="Name of product"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box maxWidth="600px">
            <TextField.Root
              size="3"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
          </Box>
          <Box maxWidth="600px">
            <TextField.Root
              size="3"
              placeholder="Enter image IPFS CID"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
            />
          </Box>
          <Box maxWidth="600px">
            <TextField.Root
              size="3"
              placeholder="Enter fallback URL for image"
              value={fallbackURL}
              onChange={(e) => setFallbackURL(e.target.value)}
              type="url"
            />
          </Box>
          <Box maxWidth="600px">
            <TextArea
              size="3"
              placeholder="Description of item"
              className={style.desc}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Box>
          <Button onClick={list} size={2} className={style.button}>
            List item
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default Seller;
