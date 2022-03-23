import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; //Redux 세팅
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers";
import "antd/dist/antd.min.css";

const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    ReduxThunk
)(createStore);

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider
                store={createStoreWithMiddleware(
                    Reducer,
                    window.__REDUX_DEVTOOLS_EXTENSION__ &&
                        window.__REDUX_DEVTOOLS_EXTENSION__()
                )}
            >
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
