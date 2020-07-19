import React from "react"
import { connect } from "react-redux"
import { getUsersThunkCreator } from "../../redux/users-reducer"
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
    } = this.props

    if (isFetching) {
      return <Preloader />
    }

    return <Users usersPage={usersPage} onPageChange={this.onPageChange} />
  }
}

let mapStateToProps = (state) => ({
  usersPage: state.usersPage,
})

let UsersContainer = connect(mapStateToProps, {
  getUsers: getUsersThunkCreator,
})(UsersAPIComponent)

export default UsersContainer
