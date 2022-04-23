import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import user from "./redux/user";
// import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <Provider store={user}>
    <App />
  </Provider>,
  document.getElementById("root")
);
