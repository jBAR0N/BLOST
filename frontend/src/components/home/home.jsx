import CSS from "./home.module.css"
import Posts from "../posts/posts"
import React from "react"

export default function Home (props) {
    return (
        <div className={CSS.contentWr}>
            <div className={CSS.tags}></div>    
            <Posts setError={props.setError} path={"date/"}/>
        </div>
    )
}