import React from "react"
import ProfileHeader from "./profile-header/profile-header"
import Posts from "./posts/posts"

export default function UserPosts (props) {
    return (
        props.user.username?
        <Posts setError={props.setError} path={"user/" + props.user.username + "/"} children={
            <ProfileHeader title="Articles"/>
        }/>
        :""
    )
}