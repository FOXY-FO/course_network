import React, { FC } from "react"
import { Link } from "react-router-dom"
import s from "./User.module.scss"
import noImage from "../../../assets/img/no-user.jpg"
import { OwnProps as Props } from "./UserContainer"

type FunctionProps = {
  follow: (id: number) => void
  unfollow: (id: number) => void
}

const User: FC<Props & FunctionProps> = ({
  id,
  photos,
  follow,
  followed,
  unfollow,
  name,
  status,
  followingInProgress,
  uniqueUrlName,
}) => {
  return (
    <div>
      <div>
        <Link to={uniqueUrlName || `/profile/${id}`} className={s.image}>
          <img src={photos.small ? photos.small : noImage} alt="" />
        </Link>
        {followed ? (
          <button
            onClick={() => unfollow(id)}
            disabled={followingInProgress.some((userId) => userId === id)}
          >
            unfollow
          </button>
        ) : (
          <button
            onClick={() => follow(id)}
            disabled={followingInProgress.some((userId) => userId === id)}
          >
            follow
          </button>
        )}
      </div>
      <div>
        <div>name: {name}</div>
        <div>status: {status}</div>
      </div>
    </div>
  )
}

export default User
