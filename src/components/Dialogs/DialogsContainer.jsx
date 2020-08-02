import React from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { addMessage } from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"
import withAuthRedirect from "../../hoc/withAuthRedirect"

class DialogsContainer extends React.Component {
  render() {
    return <Dialogs {...this.props} />
  }
}

let mapStateToProps = (state) => ({
  dialogsPage: state.dialogsPage,
})

export default compose(
  connect(mapStateToProps, { addMessage }),
  withAuthRedirect
)(DialogsContainer)
