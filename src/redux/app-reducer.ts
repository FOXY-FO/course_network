import { getUserAuthData } from "./auth-reducer"
import { InferActionsTypes, BaseThunkType } from "./redux-store"

const initialState = {
  initialized: false,
  globalError: null as string | null,
}

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "app/INITIALIZING_SUCCESS":
      return {
        ...state,
        initialized: true,
      }
    case "app/SET_GLOBAL_ERROR":
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const actions = {
  initializingSuccess: () =>
    ({
      type: "app/INITIALIZING_SUCCESS",
    } as const),
  setErrorMessage: (globalError: string | null) => {
    return {
      type: "app/SET_GLOBAL_ERROR",
      payload: { globalError },
    } as const
  },
}

export const initializeApp = (): BaseThunkType<ActionsTypes> => async (
  dispatch
) => {
  const promise = dispatch(getUserAuthData())
  await Promise.all([promise])
  dispatch(actions.initializingSuccess())
}
export const displayError = (
  error: string | null
): BaseThunkType<ActionsTypes, void> => (dispatch) => {
  dispatch(actions.setErrorMessage(error))
  setTimeout(() => {
    dispatch(actions.setErrorMessage(null))
  }, 10000)
}

export default appReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
