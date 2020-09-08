import React, { useEffect, memo } from "react"
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

const UsersAPIComponent = memo(
  ({ isFetching, getUsers, currentPage, pageSize, ...props }) => {
    useEffect(() => {
      getUsers(currentPage, pageSize)
    }, [currentPage, pageSize])

    const onPageChange = (page) => {
      getUsers(page, pageSize)
    }

    if (isFetching) return <Preloader />

    return <Users {...props} onPageChange={onPageChange} />
  }
)

let mapStateToProps = (state) => ({
  users: getUsers(state),
  totalUsersCount: getTotalUsersCount(state),
  pageSize: getPageSize(state),
  currentPage: getCurrentPage(state),
  followingInProgress: getFollowingInProgress(state),
  isFetching: getIsFetching(state),
})

export default connect(mapStateToProps, {
  getUsers: getUsersThunkCreator,
})(UsersAPIComponent)
