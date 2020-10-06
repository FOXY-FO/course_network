import React, { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import cn from "classnames"
import { getUsersThunkCreator } from "../../redux/users-reducer"
import {
  getCurrentPage,
  getFilter,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/selectors/users-selectors"
import s from "./Users.module.scss"
import {
  SearchFilters,
  SearchFiltersInitialValues,
} from "./SearchFilters/SearchFilters"
import Preloader from "../UI/Preloader/Preloader"
import UsersContainer from "./User/UserContainer"
import Pagination from "../UI/Pagination/Pagination"

export const Users = memo(() => {
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const filter = useSelector(getFilter)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const followingInProgress = useSelector(getFollowingInProgress)
  const users = useSelector(getUsers)
  const isFetching = useSelector(getIsFetching)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
  }, [dispatch, currentPage, pageSize, filter])

  const onPageChange = (page: number) => {
    dispatch(getUsersThunkCreator(page, pageSize, filter))
  }

  const onFilterChange = (values: SearchFiltersInitialValues) => {
    dispatch(
      getUsersThunkCreator(1, pageSize, {
        ...values,
        friend: values.friend === "false" ? false : true,
      })
    )
  }

  return (
    <div className={s.content}>
      <div className={cn(s.preloader, { [s.active]: isFetching })}>
        <Preloader />
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <SearchFilters onFilterChange={onFilterChange} />
      </div>
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
    </div>
  )
})
