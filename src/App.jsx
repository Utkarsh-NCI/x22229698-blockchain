import { MetaMaskContextProvider } from "./hooks/useMetaMask";
import { Theme } from "@radix-ui/themes";
import Home from "./pages/home";
import { useMessage } from "./hooks/useMessage";
import Message from "./components/message";
import style from "./App.module.css";

function App() {
  const { message } = useMessage();

  return (
    <Theme>
      <MetaMaskContextProvider>
        <div className={style.root}>
          <Home />
          {message && <Message />}
        </div>
      </MetaMaskContextProvider>
    </Theme>
  );
}

export default App;
