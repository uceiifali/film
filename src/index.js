import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import "./index.css";
import ToggleMode from "./utils/ToggleMode";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToggleMode>
    </Provider>
  </React.StrictMode>
);
