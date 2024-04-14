import React from "react";
import { useMessage } from "../../hooks/useMessage";
import { Callout } from "@radix-ui/themes";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import styles from "./message.module.css";
import { useEffect } from "react";

const Message = () => {
  const { message, clearMessage, setMsgColor, color } = useMessage();
  useEffect(() => {
    if (message) {
      setTimeout(setMsgColor, 3000);
    }
  }, [message, setMsgColor]);
  return (
    <div className={styles.rootMessage}>
      <Callout.Root color={color} className={styles.root}>
        <Callout.Text>{message}</Callout.Text>
        <Callout.Icon>
          <CrossCircledIcon onClick={clearMessage} />
        </Callout.Icon>
      </Callout.Root>
    </div>
  );
};

export default Message;
