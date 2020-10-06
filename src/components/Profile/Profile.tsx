import React, { FC, useEffect, useState, memo } from "react"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { MyPosts } from "./MyPosts/MyPosts"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { getIsAuth, getUserId } from "../../redux/selectors/auth-selectors"
import { getProfileThunk } from "../../redux/profile-reducer"

type MatchParams = {
  userId: string
}

export const Profile: FC = memo((props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const isAuth = useSelector(getIsAuth)
  const currentUserId = useSelector(getUserId)

  const dispatch = useDispatch()

  const userId = parseInt(useParams<MatchParams>().userId)
  const isOwner = isAuth && !userId

  useEffect(() => {
    if (isAuth) {
      dispatch(getProfileThunk(userId ? userId : currentUserId!))
    } else {
      if (userId) {
        dispatch(getProfileThunk(userId))
      } else {
        setShouldRedirect(true)
      }
    }
  }, [dispatch, currentUserId, isAuth, userId])

  if (shouldRedirect) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <ProfileInfo {...props} isOwner={isOwner} currentUserId={currentUserId} />
      <MyPosts />
    </>
  )
})
