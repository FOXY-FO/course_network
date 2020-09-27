import React, { memo, FC } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { AppStateType } from "../../redux/redux-store"
import { setErrorMessage } from "../../redux/app-reducer"
import ErrorMessage from "./ErrorMessage"

type MapStatePropsType = {
  message: string | null
}

type MapDispatchPropsType = {
  setErrorMessage: (globalError: string | null) => void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const ErrorMessageContainer: FC<PropsType> = ({
  setErrorMessage,
  ...props
}) => {
  return <ErrorMessage {...props} onClose={() => setErrorMessage(null)} />
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  message: state.app.globalError,
})

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    { setErrorMessage }
  ),
  memo
)(ErrorMessageContainer)
