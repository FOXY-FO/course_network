import React from "react"

const NewPost = ({newPostText, updateNewPostText, addPost}) => {
    let handleChange = value => {
        updateNewPostText(value)
    }

    return (
        <div>
            <textarea value={newPostText} onChange={(e) => handleChange(e.target.value)} />
            <button onClick={addPost}>Add post</button>
        </div>
    )
}

export default NewPost
