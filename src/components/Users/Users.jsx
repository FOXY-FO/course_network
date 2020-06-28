import React from "react"
import * as axios from 'axios'
import noImage from '../../assets/img/no-user.jpg'

let Users = ({usersPage, follow, unfollow, setUsers}) => {
    let {users, pageSize} = usersPage

    if (!users.length) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users?count=' + pageSize)
            .then(response => {
                setUsers(response.data.items)
            })
    }

    return (
        <>
            {users.map(u => (
                <div key={u.id}>
                    <div>
                        <div>
                            <img src={u.photos.small ? u.photos.small : noImage} alt=""/>
                        </div>
                        {u.followed ?
                            <button onClick={() => unfollow(u.id)}>unfollow</button> :
                            <button onClick={() => follow(u.id)}>follow</button>
                        }
                    </div>
                    <div>
                        <div>name: {u.name}</div>
                        <div>status: {u.status}</div>
                        <div>likes: {u.likesCount}</div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Users