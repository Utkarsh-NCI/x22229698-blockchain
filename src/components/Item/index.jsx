import React from "react";
import { Box, Button, Card, Inset, Text } from "@radix-ui/themes";
import style from "./item.module.css";
import { formatBalance } from "../../utils";

const Item = ({ imgURI, desc, name, price, fallbackImageURI, id, buy }) => {
  return (
    <Box maxWidth="240px" className={style.root}>
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={fallbackImageURI}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
            onError={(e) => {
              console.log(e);
            }}
          />
        </Inset>
        <Text size="3" weight="bold" align="right" as="div">
          {name}
        </Text>
        <Text as="p" size="3">
          {desc}
        </Text>
        <div className={style.button}>
          <Button onClick={() => buy(id)}>
            Buy {formatBalance(price)} ETH
          </Button>
        </div>
      </Card>
    </Box>
  );
};

export default Item;
