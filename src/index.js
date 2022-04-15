import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { GlobalStyles } from "./styles/GlobalStyles";

import "antd/dist/antd.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { store } from "./redux/reducer";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
);
