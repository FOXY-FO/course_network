import React from "react"
import * as axios from 'axios'
import User from "./User/User";

class Users extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users?count=' + this.props.usersPage.pageSize)
        .then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        let {usersPage, follow, unfollow} = this.props
        let {users} = usersPage

        return (
            <>
                {users.map(u => <User key={u.id} follow={follow} unfollow={unfollow} {...u} />)}
            </>
        )
    }
}

export default Users