import {addPostActionCreator, changeNewPostTextActionCreator} from "../../../redux/profile-reducer";
import NewPost from "./NewPost";
import {connect} from "react-redux";

let mapStateToProps = state => ({
    newPostText: state.profilePage.newPostText
})
let mapDispatchToProps = dispatch => ({
    updateNewPostText: text => {
        dispatch(changeNewPostTextActionCreator(text))
    },
    addPost: () => {
        dispatch(addPostActionCreator())
    }
})

let NewPostContainer = connect(mapStateToProps, mapDispatchToProps)(NewPost)

export default NewPostContainer
