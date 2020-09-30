import { connect } from "react-redux"
import { actions } from "../../../redux/profile-reducer"
import NewPost from "./NewPost"

type MapDispatch = {
  addPost: (text: string) => void
}

export default connect<{}, MapDispatch>(null, { addPost: actions.addPost })(
  NewPost
)
