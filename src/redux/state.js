let rerenderEntireTree = () => {
    console.log('state was changed')
}

const state = {
    profilePage: {
        newPostText: '',
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
    },
}

export const addPost = postContent => {
    const newPost = {
        id: state.profilePage.posts[state.profilePage.posts.length - 1].id + 1,
        text: postContent,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}
export const changeNewPostText = text => {
    state.profilePage.newPostText = text
    rerenderEntireTree(state)
}

export const subscribe = observer => {
    rerenderEntireTree = observer
}

export default state
