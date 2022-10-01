import Posts from "./posts/posts"
import React from "react"

export default function Bookmarks (props) {
    return (
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Reading list</div>
            </div>
            <div className="card-wrapper"/>
            <Posts path={"bookmarks/"}/>
        </React.Fragment>
    )
}