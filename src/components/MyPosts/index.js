import React from "react"
import Post from "../Post"
import NewPost from "../NewPost"

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
