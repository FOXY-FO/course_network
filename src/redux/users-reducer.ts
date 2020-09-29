import { ResultCodesEnum } from "../api/api"
import { usersAPI } from "../api/users-api"
import { displayError } from "./app-reducer"
import { UserType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const initialState = {
  users: [] as UserType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as number[], // array of users' ids
}

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "users/FOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true }
          }

          return user
        }),
      }
    case "users/UNFOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }

          return user
        }),
      }
    case "users/SET_USERS":
      return {
        ...state,
        users: [...action.users],
      }
    case "users/SET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.value,
      }
    case "users/SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.value,
      }
    case "users/TOGGLE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case "users/TOGGLE_FOLLOWING_IN_PROGRESS":
      return {
        ...state,
        followingInProgress: state.followingInProgress.some(
          (id) => id === action.userId
        )
          ? state.followingInProgress.filter((id) => id !== action.userId)
          : [...state.followingInProgress, action.userId],
      }
    default:
      return state
  }
}

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: "users/FOLLOW",
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: "users/UNFOLLOW",
      userId,
    } as const),
  setUsers: (users: UserType[]) =>
    ({
      type: "users/SET_USERS",
      users,
    } as const),
  setTotalUsersCount: (value: number) =>
    ({
      type: "users/SET_TOTAL_USERS_COUNT",
      value,
    } as const),
  setCurrentPage: (value: number) =>
    ({
      type: "users/SET_CURRENT_PAGE",
      value,
    } as const),
  toggleFetching: (isFetching: boolean) =>
    ({
      type: "users/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  toggleFollowingInProgress: (userId: number) =>
    ({
      type: "users/TOGGLE_FOLLOWING_IN_PROGRESS",
      userId,
    } as const),
}

export const getUsersThunkCreator = (
  currentPage: number,
  pageSize: number
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleFetching(true))

  const data = await usersAPI.getUsers(currentPage, pageSize)

  if (!data.error) {
    dispatch(actions.setUsers(data.items!))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.setCurrentPage(currentPage))
  } else {
    dispatch(displayError(data.error))
  }

  dispatch(actions.toggleFetching(false))
}

// const _followUnfollowFlow = async (
//   dispatch: DispatchType,
//   userId: number,
//   apiMethod: "follow" | "unfollow",
//   actionCreator: typeof followSuccess | typeof unfollowSuccess
// ): Promise<void> => {
//   dispatch(toggleFollowingInProgress(userId))

//   const res = await usersAPI[apiMethod](userId)
//   if (res.data.resultCode === ResultCodesEnum.Success) {
//     dispatch(actionCreator(userId))
//   } else if (res.data.resultCode === ResultCodesEnum.Error) {
//     dispatch(displayError(res.data.messages[0]))
//   }

//   dispatch(toggleFollowingInProgress(userId))
// }

export const followUserThunkCreator = (userId: number): ThunkType => async (
  dispatch
) => {
  // _followUnfollowFlow(dispatch, userId, "follow", followSuccess)
  dispatch(actions.toggleFollowingInProgress(userId))

  const data = await usersAPI.follow(userId)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.followSuccess(userId))
  } else if (data.resultCode === ResultCodesEnum.Error) {
    dispatch(displayError(data.messages[0]))
  }

  dispatch(actions.toggleFollowingInProgress(userId))
}
export const unfollowUserThunkCreator = (userId: number): ThunkType => async (
  dispatch
) => {
  // _followUnfollowFlow(dispatch, userId, "unfollow", unfollowSuccess)
  dispatch(actions.toggleFollowingInProgress(userId))

  const data = await usersAPI.unfollow(userId)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.unfollowSuccess(userId))
  } else if (data.resultCode === ResultCodesEnum.Error) {
    dispatch(displayError(data.messages[0]))
  }

  dispatch(actions.toggleFollowingInProgress(userId))
}

export default usersReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
