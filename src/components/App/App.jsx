import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

import routes from "../../routes"
import "./App.scss"

import Header from "../UI/Header/Header"
import NavBar from "../UI/NavBar/NavBar"

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <NavBar />

        <main className="main">
          <Switch>
            {routes.map(({ id, route, Component }) => (
              <Route key={id} path={route} render={() => <Component />} />
            ))}
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
