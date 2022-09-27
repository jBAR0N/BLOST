import Posts from "./posts/posts"
import React from "react"

export default function Bookmarks (props) {
    return (
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Reading list</div>
            </div>
            <Posts setError={props.setError} path={"bookmarks/"}/>
        </React.Fragment>
    )
}