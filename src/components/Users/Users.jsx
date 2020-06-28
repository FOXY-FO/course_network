import React from "react"
import cs from 'classnames'
import * as axios from 'axios'
import s from './Users.module.scss'
import User from "./User/User";

class Users extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users?count=' + this.props.usersPage.pageSize)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChange = page => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.usersPage.pageSize}&page=${page}`)
            .then(res => {
                this.props.setUsers(res.data.items)
                this.props.setTotalUsersCount(res.data.totalCount)
                this.props.setCurrentPage(page)
            })
    }

    render() {
        let {usersPage, follow, unfollow} = this.props
        let {users, totalUsersCount, pageSize, currentPage} = usersPage

        // Pagination
        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let paginationNumbers = []
        for (let i = 1; i <= pagesCount; i++) {
            paginationNumbers.push(i)
        }

        return (
            <>
                {paginationNumbers.length &&
                    <div className={s.pagination}>
                        {paginationNumbers.map(number => (
                            <div key={number} className={s.itemWrapper}>
                                <button
                                    className={cs(s.item, {[s.selected]: currentPage === number})}
                                    onClick={() => this.onPageChange(number)}
                                >
                                    {number}
                                </button>
                            </div>
                        ))}
                    </div>
                }
                {users.map(u => <User key={u.id} follow={follow} unfollow={unfollow} {...u} />)}
            </>
        )
    }
}

export default Users