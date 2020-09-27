import React, { useEffect, memo } from "react"
import { connect, Provider } from "react-redux"
import {
  Route,
  Switch,
  withRouter,
  BrowserRouter,
  Redirect,
} from "react-router-dom"
import { compose } from "redux"

import store from "../../redux/redux-store"
import "./App.scss"
import { initializeApp } from "../../redux/app-reducer"
import { getInitialized } from "../../redux/selectors/app-selectors"
import withSuspense from "../../hoc/withSuspense"
import { catchAllUnhandledErrors } from "../../utils/hanlders"

import NavBar from "../UI/NavBar/NavBar"
import UsersContainer from "../Users/UsersContainer"
import HeaderContainer from "../UI/Header/HeaderContainer"
import SettingsContainer from "../Settings/SettingsContainer"
import MusicContainer from "../Music/MusicContainer"
import NewsContainer from "../News/NewsContainer"
import Preloader from "../UI/Preloader/Preloader"
import ErrorMessageContainer from "../ErrorMessage/ErrorMessageContainer"
const LoginContainer = React.lazy(() => import("../Login/LoginContainer"))
const DialogsContainer = React.lazy(() => import("../Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("../Profile/ProfileContainer"))

const App = ({ initialized, initializeApp }) => {
  useEffect(() => {
    initializeApp()
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors)

    return () => {
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
    }
  }, [initializeApp])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <NavBar />
      <ErrorMessageContainer />

      <main className="main">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />
          <Route path="/login" component={withSuspense(LoginContainer)} />
          <Route
            path="/profile/:userId?"
            component={withSuspense(ProfileContainer)}
          />
          <Route path="/dialogs" component={withSuspense(DialogsContainer)} />
          <Route path="/news" component={NewsContainer} />
          <Route path="/music" component={MusicContainer} />
          <Route path="/settings" component={SettingsContainer} />
          <Route path="/users" component={UsersContainer} />
          <Route path="*" render={() => <div>404 page! Not found</div>} />
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
  connect(mapStateToProps, { initializeApp }),
  memo
)(App)

let AppWithRouter = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default AppWithRouter
