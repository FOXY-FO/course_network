import React, { useEffect } from "react"
import { connect, Provider } from "react-redux"
import { Route, Switch, withRouter, HashRouter } from "react-router-dom"
import { compose } from "redux"

import store from "../../redux/redux-store"
import "./App.scss"
import { initializeApp } from "../../redux/app-reducer"
import { getInitialized } from "../../redux/selectors/app-selectors"
import withSuspense from "../../hoc/withSuspense"

import NavBar from "../UI/NavBar/NavBar"
import UsersContainer from "../Users/UsersContainer"
import HeaderContainer from "../UI/Header/HeaderContainer"
import SettingsContainer from "../Settings/SettingsContainer"
import MusicContainer from "../Music/MusicContainer"
import NewsContainer from "../News/NewsContainer"
import Preloader from "../UI/Preloader/Preloader"
const LoginContainer = React.lazy(() => import("../Login/LoginContainer"))
const DialogsContainer = React.lazy(() => import("../Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("../Profile/ProfileContainer"))

let App = ({ initialized, initializeApp }) => {
  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <NavBar />

      <main className="main">
        <Switch>
          <Route exact path="/login" render={withSuspense(LoginContainer)} />
          <Route
            path="/profile/:userId?"
            render={withSuspense(ProfileContainer)}
          />
          <Route
            exact
            path="/dialogs"
            render={withSuspense(DialogsContainer)}
          />
          <Route exact path="/news" component={NewsContainer} />
          <Route exact path="/music" component={MusicContainer} />
          <Route exact path="/settings" component={SettingsContainer} />
          <Route exact path="/users" component={UsersContainer} />
        </Switch>
      </main>
    </div>
  )
}

let mapStateToProps = (state) => ({
  initialized: getInitialized(state),
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

let AppWithRouter = () => {
  return (
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  )
}

export default AppWithRouter
