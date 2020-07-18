import { connect } from "react-redux"
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleFetching,
  unfollow,
  toggleFollowingInProgress,
} from "../../redux/users-reducer"
import React from "react"
import api from "../../api/api"
import Users from "./Users"
import Preloader from "../UI/Preloader/Preloader"

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    this.props.toggleFetching(true)

    api.users.getUsers(this.props.usersPage.pageSize).then((response) => {
      this.props.setUsers(response.items)
      this.props.setTotalUsersCount(response.totalCount)
      this.props.toggleFetching(false)
    })
  }

  onPageChange = (page) => {
    this.props.toggleFetching(true)

    api.users.getUsers(this.props.usersPage.pageSize, page).then((res) => {
      this.props.setUsers(res.items)
      this.props.setTotalUsersCount(res.totalCount)
      this.props.setCurrentPage(page)
      this.props.toggleFetching(false)
    })
  }

  render() {
    let { usersPage, follow, unfollow, toggleFollowingInProgress } = this.props

    if (usersPage.isFetching) {
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
})(UsersAPIComponent)

export default UsersContainer
