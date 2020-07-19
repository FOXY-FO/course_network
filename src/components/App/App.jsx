import React from "react"
import { Route, Switch } from "react-router-dom"

import "./App.scss"

import NavBar from "../UI/NavBar/NavBar"
import DialogsContainer from "../Dialogs/DialogsContainer"
import UsersContainer from "../Users/UsersContainer"
import ProfileContainer from "../Profile/ProfileContainer"
import HeaderContainer from "../UI/Header/HeaderContainer"
import Login from "../Login/Login"
import SettingsContainer from "../Settings/SettingsContainer"
import MusicContainer from "../Music/MusicContainer"
import NewsContainer from "../News/NewsContainer"

const App = () => {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <NavBar />

      <main className="main">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/profile/:userId?" component={ProfileContainer} />
          <Route exact path="/dialogs" component={DialogsContainer} />
          <Route exact path="/news" component={NewsContainer} />
          <Route exact path="/music" component={MusicContainer} />
          <Route exact path="/settings" component={SettingsContainer} />
          <Route exact path="/users" component={UsersContainer} />
        </Switch>
      </main>
    </div>
  )
}

export default App
