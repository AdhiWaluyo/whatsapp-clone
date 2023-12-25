import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StateProvider } from "./stateProvider.tsx";
import reducer from "./reducer.ts";
import { initialState } from "./reducer.ts";
// import { actionTypes } from "./actionTypes.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap your App component with the StateProvider */}
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
