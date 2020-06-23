import React from "react"
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"

import "./App.scss"

import Header from "../UI/Header/Header"
import NavBar from "../UI/NavBar/NavBar"
import Profile from "../Profile/Profile"
import News from "../News/News"
import Music from "../Music/Music"
import Settings from "../Settings/Settings"
import DialogsContainer from "../Dialogs/DialogsContainer";

const App = ({store, dispatch}) => {
    return (
        <Router>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>

                <main className="main">
                    <Switch>
                        <Route exact path="/profile"
                            render={() => (
                                <Profile
                                    store={store}
                                    profilePage={store.getState().profilePage}
                                    dispatch={dispatch}
                                />
                            )}
                        />
                        <Route exact path="/dialogs"
                            render={() => <DialogsContainer dialogsPage={store.getState().dialogsPage} dispatch={dispatch}/>}
                        />
                        <Route exact path="/news" component={News}/>
                        <Route exact path="/music" component={Music}/>
                        <Route exact path="/settings" component={Settings}/>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App
