import React, { ComponentType, FC } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { AppStateType } from "../redux/redux-store"

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
})

type MapStateType = ReturnType<typeof mapStateToProps>

type MapDispatchType = {}

function withAuthRedirect<T>(Component: ComponentType<T>) {
  const NewComponent: FC<MapStateType & MapDispatchType> = (props) => {
    const { isAuth, ...restProps } = props

    if (!isAuth) return <Redirect to="/login" />

    return <Component {...(restProps as T)} />
  }

  return connect<MapStateType, MapDispatchType, T, AppStateType>(
    mapStateToProps
  )(NewComponent)
}

export default withAuthRedirect
