import { usersAPI } from "../api/api"

const FOLLOW = "network/users-reducer/FOLLOW"
const UNFOLLOW = "network/users-reducer/UNFOLLOW"
const SET_USERS = "network/users-reducer/SET_USERS"
const SET_TOTAL_USERS_COUNT = "network/users-reducer/SET_TOTAL_USERS_COUNT"
const SET_CURRENT_PAGE = "network/users-reducer/SET_CURRENT_PAGE"
const TOGGLE_IS_FETCHING = "network/users-reducer/TOGGLE_IS_FETCHING"
const TOGGLE_FOLLOWING_IN_PROGRESS =
  "network/users-reducer/TOGGLE_FOLLOWING_IN_PROGRESS"

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
}

let usersReducer = (state = initialState, action) => {
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

export let followSuccess = (userId) => ({ type: FOLLOW, userId })
export let unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export let setUsers = (users) => ({ type: SET_USERS, users })
export let setTotalUsersCount = (value) => ({
  type: SET_TOTAL_USERS_COUNT,
  value,
})
export let setCurrentPage = (value) => ({ type: SET_CURRENT_PAGE, value })
export let toggleFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})
export let toggleFollowingInProgress = (userId) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  userId,
})

export let getUsersThunkCreator = (currentPage, pageSize) => async (
  dispatch
) => {
  dispatch(toggleFetching(true))

  let response = await usersAPI.getUsers(currentPage, pageSize)

  dispatch(setUsers(response.items))
  dispatch(setTotalUsersCount(response.totalCount))
  dispatch(setCurrentPage(currentPage))

  dispatch(toggleFetching(false))
}

const followUnfollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  dispatch(toggleFollowingInProgress(userId))

  let res = await usersAPI[apiMethod](userId)
  if (res.resultCode === 0) {
    dispatch(actionCreator(userId))
  }

  dispatch(toggleFollowingInProgress(userId))
}

export let followUserThunkCreator = (userId) => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, "follow", followSuccess)
}
export let unfollowUserThunkCreator = (userId) => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, "unfollow", unfollowSuccess)
}

export default usersReducer
