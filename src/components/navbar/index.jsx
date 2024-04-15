import React, { useEffect } from "react";
import style from "./navbar.module.css";
import { useLocation } from "react-router-dom";
import { Button, TabNav } from "@radix-ui/themes";
import { useMetaMask } from "../../hooks/useMetaMask";
import { useMessage } from "../../hooks/useMessage";
import { Outlet } from "react-router-dom";
import Message from "../message";

const Nav = () => {
  const {
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    errorMessage,
    clearError,
  } = useMetaMask();
  let location = useLocation();
  const isActive = (href) => href === location.pathname;
  const logout = () => {
    window.ethereum.request({
      method: "wallet_revokePermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  };

  const { setMsgColor, message } = useMessage();

  useEffect(() => {
    if (errorMessage) {
      setMsgColor(errorMessage, "red");
    }
    return () => {
      clearError();
    };
  }, [errorMessage, setMsgColor, clearError]);

  const navMetaSite = () => {
    window.open("https://metamask.io", "_blank");
  };
  return (
    <div className={style.layout}>
      <div className={style.root}>
        <div className={style.tab}>
          <TabNav.Root className={style.tab}>
            <TabNav.Link href="/" active={isActive("/")}>
              Home
            </TabNav.Link>
            <TabNav.Link href="/news" active={isActive("/news")}>
              News
            </TabNav.Link>
          </TabNav.Root>
        </div>

        <div className={style.button}>
          {!hasProvider ? (
            <Button onClick={navMetaSite}>Install MetaMask</Button>
          ) : window.ethereum?.isMetaMask && wallet.accounts.length < 1 ? (
            <Button onClick={connectMetaMask} disabled={isConnecting}>
              Connect Metamask
            </Button>
          ) : (
            <Button onClick={logout} disabled={isConnecting}>
              Logout
            </Button>
          )}
        </div>
      </div>
      <Outlet />
      {message && <Message />}
    </div>
  );
};

export default Nav;
