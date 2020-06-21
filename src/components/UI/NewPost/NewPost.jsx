import React from "react"

const NewPost = ({ newPostText, dispatch }) => {
    let handleChange = text => {
        dispatch({type: 'CHANGE-NEW-POST-TEXT', text})
    }

    let handleClick = postContent => {
        dispatch({type: 'ADD-POST', postContent})
    }

  return (
    <div>
      <textarea
        value={newPostText}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button
        onClick={() => handleClick(newPostText)}
      >
        Add post
      </button>
    </div>
  )
}

export default NewPost
