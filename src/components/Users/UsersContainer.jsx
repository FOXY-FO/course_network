import { connect } from "react-redux"
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleFetching,
  unfollow,
  toggleFollowingInProgress,
  getUsersThunkCreator,
} from "../../redux/users-reducer"
import React from "react"
import Users from "./Users"
import Preloader from "../UI/Preloader/Preloader"

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    let {
      getUsers,
      usersPage: { currentPage, pageSize },
    } = this.props

    getUsers(currentPage, pageSize)
  }

  onPageChange = (page) => {
    let {
      getUsers,
      usersPage: { pageSize },
    } = this.props

    getUsers(page, pageSize)
  }

  render() {
    let {
      usersPage: { isFetching, ...usersPage },
      follow,
      unfollow,
      toggleFollowingInProgress,
    } = this.props

    if (isFetching) {
      return <Preloader />
    }

    return (
      <Users
        usersPage={usersPage}
        onPageChange={this.onPageChange}
        unfollow={unfollow}
        follow={follow}
        toggleFollowingInProgress={toggleFollowingInProgress}
      />
    )
  }
}

let mapStateToProps = (state) => ({
  usersPage: state.usersPage,
})

let UsersContainer = connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setTotalUsersCount,
  setCurrentPage,
  toggleFetching,
  toggleFollowingInProgress,
  getUsers: getUsersThunkCreator,
})(UsersAPIComponent)

export default UsersContainer
