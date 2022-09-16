import React from "react"
import CSS from "./userstats.module.css"
import addIcon from "./img/add.svg"

export default function UserStats () {
    return (
        <div className={CSS.header}>
            <div className={CSS.heading}>Statistics</div>
            <div className={CSS.writeArticle}>
                <img src={addIcon} alt="add" />
                <p>Create article</p>
            </div>
        </div>
    )
}