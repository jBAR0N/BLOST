import React from "react"
import Posts from "./posts/posts"

export default function UserDrafts (props) {
    return (
        props.user.username?
        <Posts draft={true} setError={props.setError} path={"drafts/"}/>
        :""
    )
}