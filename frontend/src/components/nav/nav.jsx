import CSS from "./nav.module.css"
import Logo from "./img/Logo.svg"
import {NavLink, Outlet, useNavigate} from "react-router-dom"
import React from "react"
import Header from "./header/header"
import homeIcon from "./img/home.svg"
import followedIcon from "./img/followed.svg"
import bookmarkIcon from "./img/bookmarks.svg"
import userIcon from "./img/user.svg"

export default function Nav (props) {
    const navigate = useNavigate()

    return (
        <React.Fragment>
            <div className={CSS.nav}>
                <img onClick={()=>{navigate("/")}} style={{marginBottom: "auto"}} src={Logo} alt="Logo" className={CSS.logo}/>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"/"} >
                    <img src={homeIcon} alt="home" />
                </NavLink>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"/followed"} >
                    <img src={followedIcon} alt="followed" />
                </NavLink>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"/bookmarks"} >
                    <img src={bookmarkIcon} alt="followed" />
                </NavLink>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"/profile"} >
                    <img src={userIcon} alt="followed" />
                </NavLink>
            </div>
            <div className={CSS.main}>
                <Header img={props.img} user={props.user}/>
                <div className={CSS.content}>
                    <Outlet/>
                </div>
            </div>
        </React.Fragment>
    )
}