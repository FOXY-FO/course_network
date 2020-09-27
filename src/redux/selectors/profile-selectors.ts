import { createSelector } from "reselect"
import { AppStateType } from "../redux-store"

export const getProfilePage = (state: AppStateType) => {
  return state.profilePage
}

export const getPosts = createSelector(getProfilePage, (profilePage) => {
  return profilePage.posts
})

export const getProfile = createSelector(getProfilePage, (profilePage) => {
  return profilePage.profile
})

export const getStatus = createSelector(getProfilePage, (profilePage) => {
  return profilePage.status
})
