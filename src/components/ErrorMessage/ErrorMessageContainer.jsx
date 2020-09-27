import React, { memo } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { setErrorMessage } from "../../redux/app-reducer"
import ErrorMessage from "./ErrorMessage"

const ErrorMessageContainer = ({ setErrorMessage, ...props }) => {
  return <ErrorMessage {...props} onClose={() => setErrorMessage(null)} />
}

const mapStateToProps = (state) => ({
  message: state.app.globalError,
})

export default compose(
  connect(mapStateToProps, { setErrorMessage }),
  memo
)(ErrorMessageContainer)
