import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { login } from "../../redux/auth-reducer"
import withProfileRedirect from "../../hoc/withProfileRedirect"
import Login from "./Login"

const LoginContainer = (props) => {
  return <Login {...props} />
}

const mapStateToProps = (state) => ({
  captchaURL: state.auth.captchaURL,
})

export default compose(
  connect(mapStateToProps, { login }),
  withProfileRedirect
)(LoginContainer)
