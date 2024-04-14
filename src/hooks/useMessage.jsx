import React from "react";
import { createContext, useState, useContext } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState("blue");

  const setMsgColor = (msg, _color = "blue") => {
    setColor(_color);
    setMessage(msg);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider
      value={{ message, setMsgColor, clearMessage, color }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
