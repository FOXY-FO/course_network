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
  getFilter,
} from "../../redux/selectors/users-selectors"
import Users, { SearchFiltersInitialValues } from "./Users"
import Preloader from "../UI/Preloader/Preloader"
import { AppStateType } from "../../redux/redux-store"

type MapStateType = ReturnType<typeof mapStateToProps>

type MapDispatchType = {
  getUsersThunkCreator: (
    page: number,
    pageSize: number,
    term: string,
    friend: boolean
  ) => void
}

type OwnProps = {}

type Props = MapStateType & MapDispatchType & OwnProps

const UsersAPIComponent: FC<Props> = ({
  isFetching,
  getUsersThunkCreator,
  currentPage,
  pageSize,
  filter,
  ...props
}) => {
  useEffect(() => {
    getUsersThunkCreator(currentPage, pageSize, filter.term, filter.friend)
  }, [currentPage, pageSize, getUsersThunkCreator, filter.term, filter.friend])

  const onPageChange = (page: number) => {
    getUsersThunkCreator(page, pageSize, filter.term, filter.friend)
  }

  const onFilterChange = (values: SearchFiltersInitialValues) => {
    const friend = values.friend === "false" ? false : true
    getUsersThunkCreator(1, pageSize, values.term, friend)
  }

  if (isFetching) return <Preloader />

  return (
    <Users
      {...props}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={onPageChange}
      onFilterChange={onFilterChange}
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
  filter: getFilter(state),
})

export default compose<ComponentType<OwnProps>>(
  connect<MapStateType, MapDispatchType, OwnProps, AppStateType>(
    mapStateToProps,
    { getUsersThunkCreator }
  ),
  memo
)(UsersAPIComponent)
