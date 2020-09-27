import React, { memo } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { logout } from "../../../redux/auth-reducer"
import Header from "./Header"

let HeaderContainer = (props) => {
  return <Header {...props} />
}

let mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
})

export default compose(
  connect(mapStateToProps, { logout }),
  memo
)(HeaderContainer)
