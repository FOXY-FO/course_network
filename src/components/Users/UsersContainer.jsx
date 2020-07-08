import {connect} from "react-redux";
import {
    followAC,
    setCurrentPage,
    setTotalUsersCount,
    setUsersAC,
    toggleIsFetching,
    unfollowAC
} from "../../redux/users-reducer";
import React from "react";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../UI/Preloader/Preloader";

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.toggleFetching(true)
        axios.get('https://social-network.samuraijs.com/api/1.0/users?count=' + this.props.usersPage.pageSize)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                this.props.toggleFetching(false)
            })
    }

    onPageChange = page => {
        this.props.toggleFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.usersPage.pageSize}&page=${page}`)
            .then(res => {
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount)
                this.props.setCurrentPage(page)
                this.props.toggleFetching(false)
            })
    }

    render() {
        let {usersPage, follow, unfollow} = this.props

        if (usersPage.isFetching) {
            return <Preloader/>
        }

        return <Users
            usersPage={usersPage}
            onPageChange={this.onPageChange}
            unfollow={unfollow} follow={follow}
        />
    }
}

let mapStateToProps = state => ({
    usersPage: state.usersPage
})

let mapDispatchToProps = dispatch => ({
    follow: userId => {
        dispatch(followAC(userId))
    },
    unfollow: userId => {
        dispatch(unfollowAC(userId))
    },
    setUsers: users => {
        dispatch(setUsersAC(users))
    },
    setTotalUsersCount: value => {
        dispatch(setTotalUsersCount(value))
    },
    setCurrentPage: value => {
        dispatch(setCurrentPage(value))
    },
    toggleFetching: isFetching => {
        dispatch(toggleIsFetching(isFetching))
    }
})

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)

export default UsersContainer