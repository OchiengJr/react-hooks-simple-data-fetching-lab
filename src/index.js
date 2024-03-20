import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element with id 'root' not found in the document.");
} else {
  ReactDOM.render(<App />, rootElement);
}
