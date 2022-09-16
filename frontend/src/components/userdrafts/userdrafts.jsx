import React from "react"
import CSS from "./userdrafts.module.css"
import addIcon from "./img/add.svg"
import Posts from "../posts/posts"

export default function UserDrafts (props) {
    return (
        props.user.email?
        <Posts draft={true} setError={props.setError} path={"drafts/"} children={
            <div className={CSS.header}>
                <div className={CSS.heading}>Drafts</div>
                <div className={CSS.writeArticle}>
                    <img src={addIcon} alt="add" />
                    <p>Create article</p>
                </div>
            </div>
        }/>
        :""
    )
}