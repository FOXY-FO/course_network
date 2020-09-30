import { connect } from "react-redux"
import { AppStateType } from "../../../redux/redux-store"
import MyPosts from "./MyPosts"

const mapStateToProps = (state: AppStateType) => ({
  posts: state.profilePage.posts,
})

type MapState = ReturnType<typeof mapStateToProps>

export default connect<MapState, {}, {}, AppStateType>(mapStateToProps)(MyPosts)
