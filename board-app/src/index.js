import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; //Redux 세팅
import { createStore } from "redux";
let store = createStore(() => {
    return [{ id: 0, name: "멋진신발", quan: 2 }];
});
ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
