import { createSelector } from "reselect"

export const getAuth = (state) => {
  return state.auth
}

export const getUserId = createSelector(getAuth, (auth) => {
  return auth.userId
})

export const getEmail = createSelector(getAuth, (auth) => {
  return auth.email
})

export const getLogin = createSelector(getAuth, (auth) => {
  return auth.login
})

export const getIsAuth = createSelector(getAuth, (auth) => {
  return auth.isAuth
})
