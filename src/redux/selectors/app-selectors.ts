import { createSelector } from "reselect"
import { AppStateType } from "../redux-store"

export const getApp = (state: AppStateType) => {
  return state.app
}

export const getInitialized = createSelector(getApp, (app) => {
  return app.initialized
})
