import {addMessageCreator, updateNewMessageTextCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = state => ({
    dialogsPage: state.dialogsPage
})
let mapDispatchToProps = dispatch => ({
    updateMessageText: text => {
        dispatch(updateNewMessageTextCreator(text))
    },
    addMessage: () => {
        dispatch(addMessageCreator())
    }
})

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
