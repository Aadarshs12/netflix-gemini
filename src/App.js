import React from "react";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

const App = () => {

  console.log("API KEY:", process.env.REACT_APP_GEMINI_API_KEY);

  return (
    <Provider store={appStore}>
      <div className="select-none">
        <Body />
        <ToastContainer closeOnClick={true} />
      </div>
    </Provider>
  );
};

export default App;
