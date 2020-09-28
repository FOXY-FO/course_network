import { actions } from "../../../redux/profile-reducer"
import NewPost from "./NewPost"
import { connect } from "react-redux"

export default connect(null, { addPost: actions.addPost })(NewPost)
