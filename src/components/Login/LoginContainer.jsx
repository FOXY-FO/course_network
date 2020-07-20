import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { login } from "../../redux/auth-reducer"
import withProfileRedirect from "../../hoc/withProfileRedirect"
import Login from "./Login"

class LoginContainer extends React.Component {
  render() {
    return <Login {...this.props} />
  }
}

export default compose(
  connect(null, { login }),
  withProfileRedirect
)(LoginContainer)
