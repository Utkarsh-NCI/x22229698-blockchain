/* eslint-disable react/prop-types */
import React from "react";
import style from "./article.module.css";
import { Box, Card, Inset, Text } from "@radix-ui/themes";

const Article = ({ title, description, url, urlToImage }) => {
  return (
    <Box width={"100vw"} m={"1em"}>
      <Card asChild>
        <a href={url}>
          <div className={style.container}>
            <Inset m={"1em"}>
              <img
                src={urlToImage}
                alt="Article Image"
                style={{
                  display: "block",
                  objectFit: "contain",
                  width: 140,
                  height: 140,
                  backgroundColor: "var(--gray-5)",
                }}
              />
            </Inset>
            <div className={style.textDiv}>
              <Text as="div" size="2" weight="bold">
                {title}
              </Text>
              <Text as="div" color="gray" size="2">
                {description}
              </Text>
            </div>
          </div>
        </a>
      </Card>
    </Box>
  );
};

export default Article;
