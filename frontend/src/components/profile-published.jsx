import React from "react"
import Posts from "./posts/posts"

export default function UserPosts (props) {
    return (
        props.user.username?
        <Posts setError={props.setError} path={"user/" + props.user.username + "/"}/>
        :""
    )
}