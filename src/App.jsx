import { MetaMaskContextProvider } from "./hooks/useMetaMask";
import { Theme } from "@radix-ui/themes";
import Home from "./pages/home";
import style from "./App.module.css";
import News from "./pages/news";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/navbar";
import Seller from "./pages/seller";
import Donation from "./pages/donation";

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
      {
        path: "/donation",
        element: <Donation />,
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
