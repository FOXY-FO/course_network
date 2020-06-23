let CHANGE_NEW_POST_TEXT = 'CHANGE_NEW_POST_TEXT'
let ADD_POST = 'ADD_POST'

let initialState = {
    newPostText: "",
    posts: [
        {
            id: 1,
            text: "Hey, what's up?!",
            likesCount: 13,
        },
        {
            id: 2,
            text: "What up!",
            likesCount: 1323,
        },
    ],
}

let profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText === '') return state

            let newPost = {
                id: state.posts[state.posts.length - 1].id + 1,
                text: state.newPostText,
                likesCount: 0,
            }
            state.posts.push(newPost)
            state.newPostText = ""
            return state
        case CHANGE_NEW_POST_TEXT:
            state.newPostText = action.text
            return state
        default:
            return state
    }
}

export let changeNewPostTextActionCreator = text => ({type: CHANGE_NEW_POST_TEXT, text})
export let addPostActionCreator = () => ({type: ADD_POST})

export default profileReducer