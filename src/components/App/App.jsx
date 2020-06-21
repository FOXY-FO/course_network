import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

import "./App.scss"

import Header from "../UI/Header/Header"
import NavBar from "../UI/NavBar/NavBar"
import Profile from "../Profile/Profile"
import Dialogs from "../Dialogs/Dialogs"
import News from "../News/News"
import Music from "../Music/Music"
import Settings from "../Settings/Settings"

const App = ({ state, dispatch }) => {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <NavBar />

        <main className="main">
          <Switch>
            <Route
              exact
              path="/profile"
              render={() => (
                <Profile
                  profilePage={state.profilePage}
                  dispatch={dispatch}
                />
              )}
            />
            <Route
              exact
              path="/dialogs"
              render={() => <Dialogs dialogsPage={state.dialogsPage} />}
            />
            <Route exact path="/news" component={News} />
            <Route exact path="/music" component={Music} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
