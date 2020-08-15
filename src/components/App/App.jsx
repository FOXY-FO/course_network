import React from "react"
import { connect } from "react-redux"
import { Route, Switch, withRouter } from "react-router-dom"

import "./App.scss"
import { initializeApp } from "../../redux/app-reducer"

import NavBar from "../UI/NavBar/NavBar"
import DialogsContainer from "../Dialogs/DialogsContainer"
import UsersContainer from "../Users/UsersContainer"
import ProfileContainer from "../Profile/ProfileContainer"
import HeaderContainer from "../UI/Header/HeaderContainer"
import SettingsContainer from "../Settings/SettingsContainer"
import MusicContainer from "../Music/MusicContainer"
import NewsContainer from "../News/NewsContainer"
import LoginContainer from "../Login/LoginContainer"
import { compose } from "redux"
import Preloader from "../UI/Preloader/Preloader"
import { useEffect } from "react"

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
          <Route exact path="/login" component={LoginContainer} />
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

// class App extends React.Component {
//   componentDidMount() {
//     this.props.initializeApp()
//   }

//   render() {
//     if (!this.props.initialized) {
//       return <Preloader />
//     }

//     return (
//       <div className="app-wrapper">
//         <HeaderContainer />
//         <NavBar />

//         <main className="main">
//           <Switch>
//             <Route exact path="/login" component={LoginContainer} />
//             <Route path="/profile/:userId?" component={ProfileContainer} />
//             <Route exact path="/dialogs" component={DialogsContainer} />
//             <Route exact path="/news" component={NewsContainer} />
//             <Route exact path="/music" component={MusicContainer} />
//             <Route exact path="/settings" component={SettingsContainer} />
//             <Route exact path="/users" component={UsersContainer} />
//           </Switch>
//         </main>
//       </div>
//     )
//   }
// }

let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)
