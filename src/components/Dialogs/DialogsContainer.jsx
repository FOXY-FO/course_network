import { addMessage, updateMessageText } from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"
import { connect } from "react-redux"

let mapStateToProps = (state) => ({
  dialogsPage: state.dialogsPage,
})

let DialogsContainer = connect(mapStateToProps, {
  updateMessageText,
  addMessage,
})(Dialogs)

export default DialogsContainer
