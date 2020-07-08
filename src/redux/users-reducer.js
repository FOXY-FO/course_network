let FOLLOW = 'FOLLOW'
let UNFOLLOW = 'UNFOLLOW'
let SET_USERS = 'SET_USERS'
let SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
let SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }

                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }

                    return user
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.value
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.value
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export let followAC = userId => ({type: FOLLOW, userId})
export let unfollowAC = userId => ({type: UNFOLLOW, userId})
export let setUsersAC = users => ({type: SET_USERS, users})
export let setTotalUsersCount = value => ({type: SET_TOTAL_USERS_COUNT, value})
export let setCurrentPage = value => ({type: SET_CURRENT_PAGE, value})
export let toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching })

export default usersReducer