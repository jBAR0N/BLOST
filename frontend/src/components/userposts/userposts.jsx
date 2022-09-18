import React from "react"
import CSS from "./userposts.module.css"
import addIcon from "./img/add.svg"
import Posts from "../posts/posts"

export default function UserPosts (props) {
    return (
        props.user.username?
        <Posts setError={props.setError} path={"user/" + props.user.username + "/"} children={
            <div className={CSS.header}>
                <div className={CSS.heading}>Articles</div>
                <div className={CSS.writeArticle}>
                    <img src={addIcon} alt="add" />
                    <p>Create article</p>
                </div>
            </div>
        }/>
        :""
    )
}