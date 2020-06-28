import React from 'react'
import noImage from "../../../assets/img/no-user.jpg";

class User extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div>
                        <img src={this.props.photos.small ? this.props.photos.small : noImage} alt=""/>
                    </div>
                    {this.props.followed ?
                        <button onClick={() => this.props.unfollow(this.props.id)}>unfollow</button> :
                        <button onClick={() => this.props.follow(this.props.id)}>follow</button>
                    }
                </div>
                <div>
                    <div>name: {this.props.name}</div>
                    <div>status: {this.props.status}</div>
                    <div>likes: {this.props.likesCount}</div>
                </div>
            </div>
        )
    }
}

export default User