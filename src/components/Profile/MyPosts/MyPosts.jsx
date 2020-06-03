import React from "react"
import Post from "../../UI/Post/Post"
import NewPost from "../../UI/NewPost/NewPost"

const MyPosts = () => {
  return (
    <div>
      my posts
      <NewPost />
      <div>
        <Post>Hey, what's up?!</Post>
        <Post>What up!</Post>
      </div>
    </div>
  )
}

export default MyPosts
