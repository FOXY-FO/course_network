import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        sidebar: {},
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
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}

export default store
