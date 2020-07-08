import React from "react"
import { Link } from "react-router-dom"
import s from "./User.module.scss"
import noImage from "../../../assets/img/no-user.jpg"

let User = ({
  id,
  photos,
  follow,
  followed,
  unfollow,
  name,
  status,
  likesCount,
}) => {
  return (
    <div>
      <div>
        <Link to={`/profile/${id}`} className={s.image}>
          <img src={photos.small ? photos.small : noImage} alt="" />
        </Link>
        {followed ? (
          <button onClick={() => unfollow(id)}>unfollow</button>
        ) : (
          <button onClick={() => follow(id)}>follow</button>
        )}
      </div>
      <div>
        <div>name: {name}</div>
        <div>status: {status}</div>
        <div>likes: {likesCount}</div>
      </div>
    </div>
  )
}

export default User
