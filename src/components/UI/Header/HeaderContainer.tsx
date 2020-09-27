import React, { FC, memo } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { AppStateType } from "../../../redux/redux-store"
import { logout } from "../../../redux/auth-reducer"
import Header from "./Header"

type MapStatePropsType = {
  login: string | null
  isAuth: boolean
}

type MapDispatchPropsType = {
  logout: () => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

let HeaderContainer: FC<PropsType> = (props) => {
  return <Header {...props} />
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
})

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { logout }
  ),
  memo
)(HeaderContainer)
