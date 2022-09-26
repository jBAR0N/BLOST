import Posts from "./posts/posts"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Bookmarks (props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
        if (props.user.email && !props.user.loading && !props.user.username) navigate("/profile/new", {replace: true})
    }, [props])

    return (
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Reading list</div>
            </div>
            {props.user.username?
            <Posts setError={props.setError} path={"bookmarks/"}/>
            :""}
        </React.Fragment>
    )
}