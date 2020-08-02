import { addPost } from "../../../redux/profile-reducer"
import NewPost from "./NewPost"
import { connect } from "react-redux"

let NewPostContainer = connect(null, { addPost })(NewPost)

export default NewPostContainer
