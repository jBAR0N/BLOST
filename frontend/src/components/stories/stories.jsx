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
            <div className="page-heading-wrapper">
                <div className="page-heading">Your stories</div>
            </div>
            <div className="card-wrapper">
                <NavLink className={({isActive})=>{return isActive? "card active": "card"}} end to={"/stories"}>Drafts {"("}{props.user.drafts}{")"}</NavLink>
                <NavLink className={({isActive})=>{return isActive? "card active": "card"}} to={"published"}>Published {"("}{props.user.posts}{")"}</NavLink>
            </div>
            <Outlet/>
        </div>
    )
}