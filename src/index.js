import React from 'react'
import ReactDOM from "react-dom"

import state, {addPost, changeNewPostText, subscribe} from "./redux/state"

import App from "./components/App/App"
import * as serviceWorker from "./serviceWorker"

const rerenderEntireTree = state => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} changeNewPostText={changeNewPostText} />
        </React.StrictMode>,
        document.getElementById("root")
    )
}

rerenderEntireTree(state)

subscribe(rerenderEntireTree)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
