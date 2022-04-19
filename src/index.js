import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";


ReactDOM.render(
  // <Suspense fallback={null}>
  //   <App />
  // </Suspense>,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")

);
