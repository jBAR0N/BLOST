import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import Posts from "../posts/posts"
import CSS from "./search.module.css"

export default function Search (props) {
    const navigate = useNavigate()
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