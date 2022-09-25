import CSS from "./stories.module.css"
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Stories (props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
        if (props.user.email && !props.user.loading && !props.user.username) navigate("/profile/new", {replace: true})
    }, [props])

    return (
        <div className={CSS.content}>
            <div className={CSS.infoWr}>
                <img src={props.img} alt="account" className={CSS.accountImg}/>
                <div className={CSS.infoName}>{props.user.username}</div>
                <div style={{marginLeft: "auto"}} className={CSS.infoText}>{props.user.posts}{props.user.posts === 1?" Post":" Posts"}</div>
                <div className={CSS.infoText}>{props.user.followers}{props.user.followers === 1?" Follower":" Followers"}</div>
            </div>
            <div className="card-wrapper">
                <Link className="card" to={"/article/create/new"}>+</Link>
                <NavLink className={({isActive})=>{return isActive? "card active": "card"}} end to={"/stories"}>Drafts {"("}{props.user.drafts}{")"}</NavLink>
                <NavLink className={({isActive})=>{return isActive? "card active": "card"}} to={"published"}>Published {"("}{props.user.posts}{")"}</NavLink>
            </div>
            <Outlet/>
        </div>
    )
}