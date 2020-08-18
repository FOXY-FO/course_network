import { createSelector } from "reselect"

export const getUsersPage = (state) => {
  return state.usersPage
}

export const getUsersSelector = createSelector(getUsersPage, (usersPage) => {
  return usersPage.users
})

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true)
})

export const getTotalUsersCount = createSelector(getUsersPage, (usersPage) => {
  return usersPage.totalUsersCount
})

export const getPageSize = createSelector(getUsersPage, (usersPage) => {
  return usersPage.pageSize
})

export const getCurrentPage = createSelector(getUsersPage, (usersPage) => {
  return usersPage.currentPage
})

export const getFollowingInProgress = createSelector(
  getUsersPage,
  (usersPage) => {
    return usersPage.followingInProgress
  }
)

export const getIsFetching = createSelector(getUsersPage, (usersPage) => {
  return usersPage.isFetching
})
