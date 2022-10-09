import Posts from "./previews/previews"
import React from "react"
import { Link, useLocation, Navigate } from "react-router-dom"
import { useEffect, useState } from "react";

const Home = ({user}) => {
    const [feed, setFeed] = useState(null)
    const location = useLocation()

    //get feed param (* | followed)
    useEffect(()=>{
        setFeed(((new URL(document.location)).searchParams).get('feed'))
    }, [location])

    return (
        (!user.email && !user.loading && feed === "following")?
        <Navigate to="/login" replace />
        :
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Your feed</div>
            </div>
            <div className="card-wrapper">
                <Link to={"/"} className={feed === "following"? "card": "card active"}>For you</Link>
                <Link to={"/?feed=following"} className={feed === "following"? "card active": "card"}>Following</Link>
            </div>     
            <Posts path={feed==="following"? "followed/" : "date/"}/>
        </React.Fragment>
    )
}

export default Home