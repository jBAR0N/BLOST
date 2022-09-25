import CSS from "./nav.module.css"
import Logo from "./img/Logo.svg"
import {NavLink, Outlet, useNavigate} from "react-router-dom"
import React from "react"
import Header from "./header/header"
import homeIcon from "./img/home.svg"
import bookmarkIcon from "./img/bookmarks.svg"
import storyIcon from "./img/stories.svg"
import userIcon from "./img/user.svg"

export default function Nav (props) {
    const navigate = useNavigate()

    return (
        <div className={CSS.wrapper}>
            <div className={CSS.nav}>
                <img onClick={()=>{navigate("/")}} style={{marginBottom: "auto"}} src={Logo} alt="Logo" className={CSS.logo}/>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/"} >
                    <img src={homeIcon} alt="home" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/bookmarks"} >
                    <img src={bookmarkIcon} alt="bookmarks" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/stories"} >
                    <img src={storyIcon} alt="stories" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/profile"} >
                    <img src={userIcon} alt="stories" />
                </NavLink>
            </div>
            <div className={CSS.main}>
                <Header img={props.img} user={props.user}/>
                <div className={CSS.content}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}