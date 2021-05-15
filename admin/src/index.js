import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import App from "./App/index";
import * as serviceWorker from "./serviceWorker";
import reducer from "./store";
import config from "./config";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";


const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));



const app = (
  <Provider store={store}>
    <BrowserRouter basename="/admin">
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();
