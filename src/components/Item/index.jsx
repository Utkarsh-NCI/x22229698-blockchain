import React from "react";
import { Box, Button, Card, Inset, Text } from "@radix-ui/themes";
import style from "./item.module.css";

const Item = ({ imgURI, desc }) => {
  return (
    <Box maxWidth="240px" className={style.root}>
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Text as="p" size="3">
          is the art and technique of arranging type to make written language
          legible, readable and appealing when displayed.
        </Text>
        <div className={style.button}>
          <Button>Buy</Button>
        </div>
      </Card>
    </Box>
  );
};

export default Item;
