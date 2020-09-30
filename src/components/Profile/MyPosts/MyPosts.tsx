import React, { FC } from "react"
import Post from "../../UI/Post/Post"
import NewPostContainer from "../../UI/NewPost/NewPostContainer"
import { PostType } from "../../../types/types"

type Props = {
  posts: PostType[]
}

const MyPosts: FC<Props> = ({ posts }) => {
  return (
    <div>
      <NewPostContainer />
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
