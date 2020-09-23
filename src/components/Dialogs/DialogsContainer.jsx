import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"

import { addMessage } from "../../redux/dialogs-reducer"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { getDialogsPage } from "../../redux/selectors/dialogs-selectors"

import Dialogs from "./Dialogs"

const DialogsContainer = (props) => {
  return <Dialogs {...props} />
}

let mapStateToProps = (state) => ({
  dialogsPage: getDialogsPage(state),
})

export default compose(
  connect(mapStateToProps, { addMessage }),
  withAuthRedirect
)(DialogsContainer)
