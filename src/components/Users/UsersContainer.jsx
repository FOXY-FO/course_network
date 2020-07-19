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
    this.props.getUsers(
      this.props.usersPage.currentPage,
      this.props.usersPage.pageSize
    )

    // this.props.toggleFetching(true)

    // api.users
    //   .getUsers(this.props.usersPage.currentPage, this.props.usersPage.pageSize)
    //   .then((response) => {
    //     this.props.setUsers(response.items)
    //     this.props.setTotalUsersCount(response.totalCount)
    //     this.props.setCurrentPage(this.props.usersPage.currentPage)
    //     this.props.toggleFetching(false)
    //   })
  }

  onPageChange = (page) => {
    this.props.getUsers(page, this.props.usersPage.pageSize)

    // this.props.toggleFetching(true)

    // api.users.getUsers(page, this.props.usersPage.pageSize).then((res) => {
    //   this.props.setUsers(res.items)
    //   this.props.setTotalUsersCount(res.totalCount)
    //   this.props.setCurrentPage(page)
    //   this.props.toggleFetching(false)
    // })
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
  getUsers: getUsersThunkCreator,
})(UsersAPIComponent)

export default UsersContainer
