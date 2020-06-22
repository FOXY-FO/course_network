let UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'
let ADD_MESSAGE = 'ADD_MESSAGE'

let initialState = {
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
}

let dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText
            return state
        case ADD_MESSAGE:
            if (state.newMessageText === '') return state

            let newMessage = {
                id: state.messages[state.messages.length - 1].id + 1,
                text: state.newMessageText,
            };
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        default:
            return state
    }
}

export let updateNewMessageTextCreator = newMessageText => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessageText})
export let addMessageCreator = () => ({type: ADD_MESSAGE})

export default dialogsReducer