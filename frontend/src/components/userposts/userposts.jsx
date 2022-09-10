import React from "react"
import CSS from "./userposts.module.css"
import addIcon from "./img/add.svg"

export default function UserPosts () {
    return (
        <div className={CSS.content}>
            <div className={CSS.heading}>
                <p className={CSS.heading}>Drafts</p>
                <div className={CSS.writeArticle}>
                    <img src={addIcon} alt="add" />
                    <p>Create article</p>
                </div>
            </div>
        </div>
    )
}