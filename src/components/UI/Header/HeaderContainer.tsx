import React, { ComponentType, FC, memo } from "react"
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

const HeaderContainer: FC<PropsType> = (props) => {
  return <Header {...props} />
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
})

export default compose<ComponentType<OwnPropsType>>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { logout }
  ),
  memo
)(HeaderContainer)
