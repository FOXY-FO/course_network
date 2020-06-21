import React from "react"
import {addPostActionCreator, changeNewPostTextActionCreator} from '../../../redux/state'

const NewPost = ({ newPostText, dispatch }) => {
    let handleChange = text => {
        dispatch(changeNewPostTextActionCreator(text))
    }

    let handleClick = postContent => {
        dispatch(addPostActionCreator(postContent))
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
