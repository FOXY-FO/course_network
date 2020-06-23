import React from "react"
import {Route, Switch} from "react-router-dom"

import "./App.scss"

import Header from "../UI/Header/Header"
import NavBar from "../UI/NavBar/NavBar"
import Profile from "../Profile/Profile"
import News from "../News/News"
import Music from "../Music/Music"
import Settings from "../Settings/Settings"
import DialogsContainer from "../Dialogs/DialogsContainer";

const App = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <NavBar/>

            <main className="main">
                <Switch>
                    <Route exact path="/profile"
                           render={() => <Profile />}
                    />
                    <Route exact path="/dialogs"
                           render={() => <DialogsContainer />}
                    />
                    <Route exact path="/news" component={News}/>
                    <Route exact path="/music" component={Music}/>
                    <Route exact path="/settings" component={Settings}/>
                </Switch>
            </main>
        </div>
    )
}

export default App
