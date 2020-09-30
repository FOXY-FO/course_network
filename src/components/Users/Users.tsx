import React, { FC } from "react"
import UsersContainer from "./User/UserContainer"
import Pagination from "../UI/Pagination/Pagination"
import { UserType } from "../../types/types"

type Props = {
  users: UserType[]
  totalUsersCount: number
  followingInProgress: number[]
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Users: FC<Props> = ({
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
