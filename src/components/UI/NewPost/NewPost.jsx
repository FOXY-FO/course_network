import React from "react"

const NewPost = ({
                     addPost,
                     newPostText,
                     changeNewPostText
                 }) => {
    return (
        <div>
            <textarea value={newPostText} onChange={e => {
                changeNewPostText(e.target.value)
            }}/>
            <button
                onClick={() => {
                    addPost(newPostText)
                }}
            >
                Add post
            </button>
        </div>
    )
}

export default NewPost
