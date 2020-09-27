import { createSelector } from "reselect"
import { AppStateType } from "../redux-store"

export const getDialogsPage = (state: AppStateType) => {
  return state.dialogsPage
}

export const getUsers = createSelector(getDialogsPage, (dialogsPage) => {
  return dialogsPage.users
})

export const getMessages = createSelector(getDialogsPage, (dialogsPage) => {
  return dialogsPage.messages
})
