import { MetaMaskContextProvider } from "./hooks/useMetaMask";
import { Theme } from "@radix-ui/themes";
import Home from "./pages/home";
import style from "./App.module.css";
import News from "./pages/news";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/navbar";
import Seller from "./pages/seller";

const router = createBrowserRouter([
  {
    element: <Nav />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/seller",
        element: <Seller />,
      },
    ],
  },
]);

function App() {
  return (
    <Theme>
      <MetaMaskContextProvider>
        <div className={style.root}>
          <RouterProvider router={router} />
        </div>
      </MetaMaskContextProvider>
    </Theme>
  );
}

export default App;
