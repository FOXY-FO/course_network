import React from "react"
import { connect } from "react-redux"
import { getUsersThunkCreator } from "../../redux/users-reducer"
import Users from "./Users"
import Preloader from "../UI/Preloader/Preloader"
import {
  getUsers,
  getTotalUsersCount,
  getPageSize,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
} from "../../redux/users-selectors"

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    let { getUsers, currentPage, pageSize } = this.props
    getUsers(currentPage, pageSize)
  }

  onPageChange = (page) => {
    let { getUsers, pageSize } = this.props
    getUsers(page, pageSize)
  }

  render() {
    let { isFetching, ...props } = this.props

    if (isFetching) {
      return <Preloader />
    }

    return <Users {...props} onPageChange={this.onPageChange} />
  }
}

let mapStateToProps = (state) => ({
  users: getUsers(state),
  totalUsersCount: getTotalUsersCount(state),
  pageSize: getPageSize(state),
  currentPage: getCurrentPage(state),
  followingInProgress: getFollowingInProgress(state),
  isFetching: getIsFetching(state),
})

let UsersContainer = connect(mapStateToProps, {
  getUsers: getUsersThunkCreator,
})(UsersAPIComponent)

export default UsersContainer
