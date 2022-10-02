import React from "react"
import { useParams } from "react-router-dom"
import Posts from "./posts/posts"

export default function Search (props) {
    const {keyword} = useParams()

    return (
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Results for {keyword}</div>
            </div>
            <div className="card-wrapper"/>
            <Posts path={"search/" + keyword + "/"}/>
        </React.Fragment>
    )
}