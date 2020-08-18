import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"

import { addMessage } from "../../redux/dialogs-reducer"
import withAuthRedirect from "../../hoc/withAuthRedirect"
import { getDialogsPage } from "../../redux/selectors/dialogs-selectors"

import Dialogs from "./Dialogs"

class DialogsContainer extends React.Component {
  render() {
    return <Dialogs {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  dialogsPage: getDialogsPage(state),
})

export default compose(
  connect(mapStateToProps, { addMessage }),
  withAuthRedirect
)(DialogsContainer)
