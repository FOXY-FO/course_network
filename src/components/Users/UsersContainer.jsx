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
  ({ isFetching, getUsersThunkCreator, currentPage, pageSize, ...props }) => {
    useEffect(() => {
      getUsersThunkCreator(currentPage, pageSize)
    }, [currentPage, pageSize, getUsersThunkCreator])

    const onPageChange = (page) => {
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
  getUsersThunkCreator,
})(UsersAPIComponent)
