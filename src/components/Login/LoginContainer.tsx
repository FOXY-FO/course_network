import React, { FC, memo } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { AppStateType } from "../../redux/redux-store"
import { login } from "../../redux/auth-reducer"
import withProfileRedirect from "../../hoc/withProfileRedirect"
import Login from "./Login"

type TMapStateProps = {
  captchaURL: string | null
}

type TMapDispatchProps = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void
}

export type TProps = TMapStateProps & TMapDispatchProps

const LoginContainer: FC<TProps> = (props) => {
  return <Login {...props} />
}

const mapStateToProps = (state: AppStateType): TMapStateProps => ({
  captchaURL: state.auth.captchaURL,
})

export default compose(
  connect(mapStateToProps, { login }),
  withProfileRedirect,
  memo
)(LoginContainer)
