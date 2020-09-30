import React, { FC } from "react"
import s from "./Post.module.scss"
import noUser from "../../../assets/img/no-user.jpg"

type Props = {
  likesCount: number
  image?: string
}

const Post: FC<Props> = ({ children, likesCount, image = noUser }) => {
  return (
    <div>
      <div className={s.post}>
        <div className={s.image}>
          <img src={image} alt="" />
        </div>
        <div className={s.text}>{children}</div>
      </div>
      <div className={s.likesWrapper}>
        <div>likes: {likesCount}</div>
      </div>
    </div>
  )
}

export default Post
