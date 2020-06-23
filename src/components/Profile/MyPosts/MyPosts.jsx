import React from "react"
import Post from "../../UI/Post/Post"
import NewPostContainer from "../../UI/NewPost/NewPostContainer";

const MyPosts = ({newPostText, posts, store, dispatch}) => {
    return (
        <div>
            <NewPostContainer store={store} />
            <div>
                {posts.map(({id, text, likesCount}) => (
                    <Post key={id} likesCount={likesCount}>
                        {text}
                    </Post>
                ))}
            </div>
        </div>
    )
}

export default MyPosts
