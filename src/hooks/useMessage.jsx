import React from "react";
import { createContext, useState, useContext } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const setMsg = (msg) => {
    setMessage(msg);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={{ message, setMsg, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
