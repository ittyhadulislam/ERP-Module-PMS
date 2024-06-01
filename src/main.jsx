import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App";
import AppLogout from "./components/AppLogout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// log disabled in production versions
if (process.env.NODE_ENV === "production") {
  console.log = () => { };
  console.error = () => { };
  console.debug = () => { };
}

// on browser close localStorage clear
window.onbeforeunload = function (event) {
  if (event) {
    // localStorage.clear();
  }
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppLogout>
      <App />
      <ToastContainer />
    </AppLogout>
    {/* <RouterProvider router={routes}></RouterProvider> */}
  </Provider>
  //     <React.StrictMode>
  // </React.StrictMode>
);
