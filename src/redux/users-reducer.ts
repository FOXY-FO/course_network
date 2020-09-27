import { usersAPI } from "../api/api"
import { UserType } from "../types/types"

const FOLLOW = "network/users-reducer/FOLLOW"
const UNFOLLOW = "network/users-reducer/UNFOLLOW"
const SET_USERS = "network/users-reducer/SET_USERS"
const SET_TOTAL_USERS_COUNT = "network/users-reducer/SET_TOTAL_USERS_COUNT"
const SET_CURRENT_PAGE = "network/users-reducer/SET_CURRENT_PAGE"
const TOGGLE_IS_FETCHING = "network/users-reducer/TOGGLE_IS_FETCHING"
const TOGGLE_FOLLOWING_IN_PROGRESS =
  "network/users-reducer/TOGGLE_FOLLOWING_IN_PROGRESS"

const initialState = {
  users: [] as UserType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as number[], // array of users' ids
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true }
          }

          return user
        }),
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }

          return user
        }),
      }
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.value,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.value,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case TOGGLE_FOLLOWING_IN_PROGRESS:
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

type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
export let followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId,
})
type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export let unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW,
  userId,
})
type SetUsersActionType = {
  type: typeof SET_USERS
  users: UserType[]
}
export let setUsers = (users: UserType[]): SetUsersActionType => ({
  type: SET_USERS,
  users,
})
type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  value: number
}
export let setTotalUsersCount = (
  value: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  value,
})
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  value: number
}
export let setCurrentPage = (value: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  value,
})
type ToggleFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export let toggleFetching = (
  isFetching: boolean
): ToggleFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})
type ToggleFollowingInProgressActionType = {
  type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
  userId: number
}
export let toggleFollowingInProgress = (
  userId: number
): ToggleFollowingInProgressActionType => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  userId,
})

export let getUsersThunkCreator = (
  currentPage: number,
  pageSize: number
) => async (dispatch: any) => {
  dispatch(toggleFetching(true))

  let response = await usersAPI.getUsers(currentPage, pageSize)

  dispatch(setUsers(response.items))
  dispatch(setTotalUsersCount(response.totalCount))
  dispatch(setCurrentPage(currentPage))

  dispatch(toggleFetching(false))
}

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: "follow" | "unfollow",
  actionCreator: any
) => {
  dispatch(toggleFollowingInProgress(userId))

  let res = await usersAPI[apiMethod](userId)
  if (res.resultCode === 0) {
    dispatch(actionCreator(userId))
  }

  dispatch(toggleFollowingInProgress(userId))
}

export let followUserThunkCreator = (userId: number) => async (
  dispatch: any
) => {
  followUnfollowFlow(dispatch, userId, "follow", followSuccess)
}
export let unfollowUserThunkCreator = (userId: number) => async (
  dispatch: any
) => {
  followUnfollowFlow(dispatch, userId, "unfollow", unfollowSuccess)
}

export default usersReducer
