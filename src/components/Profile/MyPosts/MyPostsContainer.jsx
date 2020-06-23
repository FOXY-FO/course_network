import React from "react"
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = state => ({posts: state.profilePage.posts})

const MyPostsContainer = connect(mapStateToProps)(MyPosts)

export default MyPostsContainer
