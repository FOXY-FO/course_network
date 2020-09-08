import { connect } from "react-redux"
import MyPosts from "./MyPosts"

let mapStateToProps = (state) => ({ posts: state.profilePage.posts })

export default connect(mapStateToProps)(MyPosts)
