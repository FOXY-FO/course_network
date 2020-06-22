let UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'
let ADD_MESSAGE = 'ADD_MESSAGE'

let dialogsReducer = (state, action) => {
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