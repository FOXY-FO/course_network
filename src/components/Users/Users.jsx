import React from "react"
import s from "./Users.module.scss"
import cs from "classnames"
import UsersContainer from "./User/UserContainer"

let Users = ({
  usersPage: { users, totalUsersCount, pageSize, currentPage },
  follow,
  unfollow,
  onPageChange,
}) => {
  // Pagination
  let pagesCount = Math.ceil(totalUsersCount / pageSize)
  let paginationNumbers = []
  for (let i = 1; i <= pagesCount; i++) {
    paginationNumbers.push(i)
  }

  return (
    <>
      {paginationNumbers.length && (
        <div className={s.pagination}>
          {paginationNumbers.map((number) => (
            <div key={number} className={s.itemWrapper}>
              <button
                className={cs(s.item, { [s.selected]: currentPage === number })}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </div>
          ))}
        </div>
      )}
      {users.map((u) => (
        <UsersContainer key={u.id} follow={follow} unfollow={unfollow} {...u} />
      ))}
    </>
  )
}

export default Users
