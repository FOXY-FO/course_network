import React from "react"
import noImage from '../../assets/img/no-user.jpg'

let Users = ({usersPage, follow, unfollow, setUsers}) => {
    let {users} = usersPage

    if (!users.length) {
        setUsers([
            {
                id: 1,
                image: 'https://sun2-3.userapi.com/6ENtooUWVI-dY0S0MIGT4uQsOQ1tY-iXXz9oRQ/4OEEZsXFznQ.jpg',
                fullName: 'Vlad Balabkin',
                status: '1703',
                likesCount: 51,
                isFollowed: false,
                location: {
                    country: 'the USA',
                    city: 'San Francisco'
                },
            },
            {
                id: 2,
                image: 'https://sun9-14.userapi.com/c855620/v855620944/1e99cc/wBXEuAubXdE.jpg',
                fullName: 'Marina Alexandrovna',
                status: 'Shoooo?!?!?',
                likesCount: 321,
                isFollowed: true,
                location: {
                    country: 'Germany',
                    city: 'Rothenburg ob der Tauber'
                },
            },
            {
                id: 3,
                image: 'https://sun9-69.userapi.com/c631426/v631426381/4942b/B2N-KaI48YU.jpg',
                fullName: 'Alina Surnakova',
                status: 'Musya Yurevna',
                likesCount: 52,
                isFollowed: true,
                location: {
                    country: 'Russia',
                    city: 'Saint-Petersburg'
                },
            }
        ])
    }

    return (
        <>
            {users.map(u => <div>
                <div key={u.id}>
                    <div>
                        <img src={u.image ? u.image : noImage} alt=""/>
                    </div>
                    {u.isFollowed ?
                        <button onClick={() => unfollow(u.id)}>unfollow</button> :
                        <button onClick={() => follow(u.id)}>follow</button>
                    }
                </div>
                <div>
                    <div>name: {u.fullName}</div>
                    <div>status: {u.status}</div>
                    <div>location: {u.location.country}, {u.location.city}</div>
                    <div>likes: {u.likesCount}</div>
                </div>
            </div>)}
        </>
    )
}

export default Users