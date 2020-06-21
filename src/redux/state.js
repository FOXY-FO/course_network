let CHANGE_NEW_POST_TEXT = 'CHANGE_NEW_POST_TEXT'
let ADD_POST = 'ADD_POST'
let UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'
let ADD_MESSAGE = 'ADD_MESSAGE'

let store = {
    _state: {
        profilePage: {
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
        },

        dialogsPage: {
            users: [
                {
                    id: 1,
                    name: "Vlad",
                },
                {
                    id: 2,
                    name: "Alina",
                },
                {
                    id: 3,
                    name: "Liza",
                },
            ],
            messages: [
                {
                    id: 1,
                    text: "Hi",
                },
                {
                    id: 2,
                    text: "How are you?",
                },
                {
                    id: 3,
                    text: "I'm fine, thank you",
                },
            ],
            newMessageText: '',
        },
    },
    _callSubscriber() {
        console.log("state was changed")
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            if (this._state.profilePage.newPostText != '') {
                let newPost = {
                    id: this._state.profilePage.posts[this._state.profilePage.posts.length - 1].id + 1,
                    text: action.postContent,
                    likesCount: 0,
                }
                this._state.profilePage.posts.push(newPost)
                this._state.profilePage.newPostText = ""
                this._callSubscriber(this._state)
            }
        } else if (action.type === CHANGE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.text
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newMessageText
            this._callSubscriber(this._state)
        } else if (action.type === ADD_MESSAGE) {
            if (this._state.dialogsPage.newMessageText != '') {
                let newMessage = {
                    id: this._state.dialogsPage.messages[this._state.dialogsPage.messages.length - 1].id + 1,
                    text: this._state.dialogsPage.newMessageText,
                };
                this._state.dialogsPage.messages.push(newMessage)
                this._state.dialogsPage.newMessageText = ''
                this._callSubscriber(this._state)
            }
        }
    }
}

export let updateNewMessageTextCreator = newMessageText => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText})
export let addMessageCreator = () => ({type: ADD_MESSAGE})
export let changeNewPostTextActionCreator = text => ({type: CHANGE_NEW_POST_TEXT, text})
export let addPostActionCreator = postContent => ({type: ADD_POST, postContent})

export default store
