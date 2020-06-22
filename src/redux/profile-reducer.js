let CHANGE_NEW_POST_TEXT = 'CHANGE_NEW_POST_TEXT'
let ADD_POST = 'ADD_POST'

let profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostText === '') return state

            let newPost = {
                id: state.posts[state.posts.length - 1].id + 1,
                text: action.postContent,
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
export let addPostActionCreator = postContent => ({type: ADD_POST, postContent})

export default profileReducer