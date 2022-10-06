import Posts from "./posts/posts"
import React from "react"
import { Link } from "react-router-dom"

const Home = props => (
    <React.Fragment>
        <div className="page-heading-wrapper">
            <div className="page-heading">Your feed</div>
        </div>
        <div className="card-wrapper">
            <Link to={"/"} className={props.following? "card": "card active"}>For you</Link>
            <Link to={"/me/following"} className={props.following? "card active": "card"}>Following</Link>
        </div>     
        <Posts path={props.following? "followed/" : "date/"}/>
    </React.Fragment>
)

export default Home