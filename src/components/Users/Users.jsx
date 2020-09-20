import React from "react"
import UsersContainer from "./User/UserContainer"
import Pagination from "../UI/Pagination/Pagination"

let Users = ({
  users,
  totalUsersCount,
  pageSize,
  currentPage,
  followingInProgress,
  onPageChange,
}) => {
  return (
    <>
      <Pagination
        total={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      {users.map((u) => (
        <UsersContainer
          key={u.id}
          followingInProgress={followingInProgress}
          {...u}
        />
      ))}
    </>
  )
}

export default Users
