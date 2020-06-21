import React from "react"
import Post from "../../UI/Post/Post"
import NewPost from "../../UI/NewPost/NewPost"

const MyPosts = ({ newPostText, posts, dispatch }) => {
  return (
    <div>
      <NewPost
        newPostText={newPostText}
        dispatch={dispatch}
      />
      <div>
        {posts.map(({ id, text, likesCount }) => (
          <Post key={id} likesCount={likesCount}>
            {text}
          </Post>
        ))}
      </div>
    </div>
  )
}

export default MyPosts
