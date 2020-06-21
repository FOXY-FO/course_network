import React from "react"
import Post from "../../UI/Post/Post"
import NewPost from "../../UI/NewPost/NewPost"

const MyPosts = ({ newPostText, posts, addPost, changeNewPostText }) => {
  return (
    <div>
      <NewPost
        newPostText={newPostText}
        addPost={addPost}
        changeNewPostText={changeNewPostText}
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
