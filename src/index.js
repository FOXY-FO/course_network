import React from 'react'
import ReactDOM from "react-dom"

import store from "./redux/redux-store"

import App from "./components/App/App"
import * as serviceWorker from "./serviceWorker"
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";

const rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <Provider store={store}>
                    <App/>
                </Provider>
            </Router>
        </React.StrictMode>,
        document.getElementById("root")
    )
}

rerenderEntireTree()

store.subscribe(rerenderEntireTree)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
