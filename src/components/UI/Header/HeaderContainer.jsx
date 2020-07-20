import React, { useEffect } from "react"
import { connect } from "react-redux"
import {
  setUserData,
  getUserAuthData,
  logout,
} from "../../../redux/auth-reducer"
import Header from "./Header"

let HeaderContainer = (props) => {
  useEffect(() => {
    props.getUserAuthData()
  }, [])

  return <Header {...props} />
}

let mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {
  setUserData,
  getUserAuthData,
  logout,
})(HeaderContainer)
