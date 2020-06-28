import {connect} from "react-redux";
import {followAC, setUsersAC, unfollowAC} from "../../redux/users-reducer";
import Users from "./Users";

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
    }
})

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer