import { InferActionsTypes } from "./redux-store"

const initialState = {}

const sidebarReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    default:
      return state
  }
}

export const actions = {}

export default sidebarReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
