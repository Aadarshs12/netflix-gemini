import React from "react";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Provider store={appStore}>
      <div className="bg-black select-none">
        <Body />
        <ToastContainer closeOnClick={true}/>
      </div>
    </Provider>
  );
};

export default App;
