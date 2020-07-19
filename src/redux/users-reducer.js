import api from "../api/api"

let FOLLOW = "FOLLOW"
let UNFOLLOW = "UNFOLLOW"
let SET_USERS = "SET_USERS"
let SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
let SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
let TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
let TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS"

let initialState = {
  users: [],
  pageSize: 5,
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
        followingInProgress: state.followingInProgress.find(
          (id) => id === action.userId
        )
          ? state.followingInProgress.filter((id) => id === action.userId)
          : [...state.followingInProgress, action.userId],
      }
    default:
      return state
  }
}

export let follow = (userId) => ({ type: FOLLOW, userId })
export let unfollow = (userId) => ({ type: UNFOLLOW, userId })
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

export let getUsersThunkCreator = (currentPage, pageSize) => (dispatch) => {
  dispatch(toggleFetching(true))

  api.users.getUsers(currentPage, pageSize).then((response) => {
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleFetching(false))
  })
}

export default usersReducer
