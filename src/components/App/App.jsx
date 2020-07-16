import React from "react"
import { Route, Switch } from "react-router-dom"

import "./App.scss"

import Header from "../UI/Header/Header"
import NavBar from "../UI/NavBar/NavBar"
import News from "../News/News"
import Music from "../Music/Music"
import Settings from "../Settings/Settings"
import DialogsContainer from "../Dialogs/DialogsContainer"
import UsersContainer from "../Users/UsersContainer"
import ProfileContainer from "../Profile/ProfileContainer"

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />

      <main className="main">
        <Switch>
          <Route path="/profile/:userId?" component={ProfileContainer} />
          <Route exact path="/dialogs" component={DialogsContainer} />
          <Route exact path="/news" component={News} />
          <Route exact path="/music" component={Music} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/users" component={UsersContainer} />
        </Switch>
      </main>
    </div>
  )
}

export default App
