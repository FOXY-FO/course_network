import React from "react"
import { connect } from "react-redux"
import { setErrorMessage } from "../../redux/error-reducer"
import ErrorMessage from "./ErrorMessage"

const ErrorMessageContainer = ({ setErrorMessage, ...props }) => {
  return <ErrorMessage {...props} onClose={() => setErrorMessage(null)} />
}

const mapStateToProps = (state) => ({
  message: state.error.errorMessage,
})

export default connect(mapStateToProps, { setErrorMessage })(
  ErrorMessageContainer
)
