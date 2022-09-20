import CSS from "./profile.module.css"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import featherIcon from "./img/feather.svg"
import penIcon from "./img/pen.svg"
import articleIcon from "./img/article.svg"
import { useEffect } from "react"

export default function Profile (props) {
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
            <div className={CSS.nav}>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} end to={"/profile"}><img className={CSS.navIcon} src={featherIcon} alt={"drafts"}/></NavLink>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"articles"}><img className={CSS.navIcon} src={articleIcon} alt={"articles"}/></NavLink>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"edit"}><img className={CSS.navIcon} src={penIcon} alt={"edit"}/></NavLink>
            </div>
            <Outlet/>
        </div>
    )
}