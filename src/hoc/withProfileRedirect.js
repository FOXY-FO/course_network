import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

let withProfileRedirect = (Component) => {
  let NewComponent = ({ isAuth, ...props }) => {
    if (isAuth) return <Redirect to="/profile" />

    return <Component {...props} />
  }

  return connect(mapStateToProps)(NewComponent)
}

export default withProfileRedirect
