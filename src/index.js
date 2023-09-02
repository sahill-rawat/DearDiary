import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ColorModeSwitcher from './ColorModeSwitcher';
import { AuthProvider } from "./Auth";
import { StoreProvider } from './Store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <ColorModeSwitcher/>
    <ColorModeScript />
    <StoreProvider><AuthProvider>
      <App />
      </AuthProvider></StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);