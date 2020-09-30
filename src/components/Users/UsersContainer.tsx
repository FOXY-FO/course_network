import React, { useEffect, memo, FC, ComponentType } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { getUsersThunkCreator } from "../../redux/users-reducer"
import {
  getUsers,
  getTotalUsersCount,
  getPageSize,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
} from "../../redux/selectors/users-selectors"
import Users from "./Users"
import Preloader from "../UI/Preloader/Preloader"
import { AppStateType } from "../../redux/redux-store"

type MapStateType = ReturnType<typeof mapStateToProps>

type MapDispatchType = {
  getUsersThunkCreator: (page: number, pageSize: number) => void
}

type OwnProps = {}

type Props = MapStateType & MapDispatchType & OwnProps

const UsersAPIComponent: FC<Props> = ({
  isFetching,
  getUsersThunkCreator,
  currentPage,
  pageSize,
  ...props
}) => {
  useEffect(() => {
    getUsersThunkCreator(currentPage, pageSize)
  }, [currentPage, pageSize, getUsersThunkCreator])

  const onPageChange = (page: number) => {
    getUsersThunkCreator(page, pageSize)
  }

  if (isFetching) return <Preloader />

  return (
    <Users
      {...props}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  )
}

const mapStateToProps = (state: AppStateType) => ({
  users: getUsers(state),
  totalUsersCount: getTotalUsersCount(state),
  pageSize: getPageSize(state),
  currentPage: getCurrentPage(state),
  followingInProgress: getFollowingInProgress(state),
  isFetching: getIsFetching(state),
})

export default compose<ComponentType<OwnProps>>(
  connect<MapStateType, MapDispatchType, OwnProps, AppStateType>(
    mapStateToProps,
    { getUsersThunkCreator }
  ),
  memo
)(UsersAPIComponent)