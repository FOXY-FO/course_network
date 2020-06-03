import React from "react"
import Post from "../../UI/Post/Post"
import NewPost from "../../UI/NewPost/NewPost"

const MyPosts = ({ posts }) => {
  return (
    <div>
      <NewPost />
      <div>
        {posts.map(({ id, text, likes }) => (
          <Post key={id} likes={likes}>
            {text}
          </Post>
        ))}
      </div>
    </div>
  )
}

export default MyPosts
