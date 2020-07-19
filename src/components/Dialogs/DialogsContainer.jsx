import React from "react"
import { connect } from "react-redux"
import { addMessage, updateMessageText } from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"
import { Redirect } from "react-router-dom"

class DialogsContainer extends React.Component {
  render() {
    if (!this.props.isAuth) return <Redirect to="/login" />

    return <Dialogs {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  dialogsPage: state.dialogsPage,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {
  updateMessageText,
  addMessage,
})(DialogsContainer)
