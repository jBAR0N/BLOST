import React from "react"
import Posts from "./posts/posts"
import ProfileHeader from "./profile-header/profile-header"

export default function UserDrafts (props) {
    return (
        props.user.username?
        <Posts draft={true} setError={props.setError} path={"drafts/"} children={
            <ProfileHeader title="Drafts"/>
        }/>
        :""
    )
}