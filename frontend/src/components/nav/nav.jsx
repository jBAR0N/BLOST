import CSS from "./nav.module.css"
import Logo from "./img/Logo.svg"
import {Navigate, NavLink, Outlet, useNavigate} from "react-router-dom"
import React, {useEffect} from "react"
import homeIcon from "./img/home.svg"
import listIcon from "./img/list.svg"
import storyIcon from "./img/stories.svg"
import userIcon from "./img/user.svg"
import bellIcon from "./img/bell.svg"
import searchIcon from "./img/search.svg"

export default function Nav (props) {
    const navigate = useNavigate()

    return (
        <div className={CSS.wrapper}>
            <div className={CSS.nav}>
                <img onClick={()=>{navigate("/")}} style={{marginBottom: "auto"}} src={Logo} alt="Logo" className={CSS.logo}/>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/"} >
                    <img src={homeIcon} alt="home" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/me/search"} >
                    <img src={searchIcon} alt="search" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/me/list"} >
                    <img src={listIcon} alt="list" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/me/notifications"} >
                    <img src={bellIcon} alt="notifications" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/me/stories"} >
                    <img src={storyIcon} alt="stories" />
                </NavLink>
                <div className={CSS.link}>
                    <img src={userIcon} alt="profile" />
                </div>
            </div>
            <div className={CSS.main}>
                <div className={CSS.content}>
                    {!props.user.email && !props.user.loading && props.me?
                        <Navigate to="/login" replace/>:
                        <Outlet/>
                    }
                </div>
            </div>
        </div>
    )
}