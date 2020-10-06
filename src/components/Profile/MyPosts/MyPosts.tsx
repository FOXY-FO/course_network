import React, { FC } from "react"
import { useSelector } from "react-redux"
import { getPosts } from "../../../redux/selectors/profile-selectors"
import Post from "../../UI/Post/Post"
import { NewPost } from "../../UI/NewPost/NewPost"

export const MyPosts: FC = () => {
  const posts = useSelector(getPosts)

  return (
    <div>
      <NewPost />
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
