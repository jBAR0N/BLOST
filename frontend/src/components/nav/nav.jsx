import CSS from "./nav.module.css"
import Logo from "./img/Logo.svg"
import {Navigate, NavLink, Outlet, useNavigate} from "react-router-dom"
import React, { useState, useEffect } from "react"
import homeIcon from "./img/home.svg"
import listIcon from "./img/list.svg"
import storyIcon from "./img/stories.svg"
import userIcon from "./img/user.svg"
import bellIcon from "./img/bell.svg"
import searchIcon from "./img/search.svg"
import SearchBox from "./searchbox/searchbox"
import Menu from "./menu/menu"

export default function Nav (props) {
    const navigate = useNavigate()

    const [search, setSearch] = useState(false)
    const [menu, setMenu] = useState(false)

    useEffect(()=>{
        function handleClick () {
            if (menu) setMenu(false)
            if (search) setSearch (false)
        }
        window.addEventListener("click", handleClick)
        return ()=>{window.removeEventListener("click", handleClick)}
    })

    return (
        <div className={CSS.wrapper}>
            <Menu user={props.user} setMenu={setMenu} menu={menu} />
            <div className={CSS.nav}>
                <img onClick={()=>{navigate("/")}} style={{marginBottom: "auto"}} src={Logo} alt="Logo" className={CSS.logo}/>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/"} >
                    <img src={homeIcon} alt="home" />
                </NavLink>
                <div onClick={()=>{setTimeout(()=>{setSearch(!search)})}} className={search? CSS.link + " " + CSS.active: CSS.link}>
                    <img src={searchIcon} alt="search" />
                    <SearchBox setSearch={setSearch} search={search} />
                </div>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/me/list"} >
                    <img src={listIcon} alt="list" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/me/notifications"} >
                    {props.unread && <div className={CSS.notIndicator}/>}
                    <img src={bellIcon} alt="notifications" />
                </NavLink>
                <NavLink className={(({isActive})=>(isActive? CSS.link + " " + CSS.active: CSS.link))} to={"/me/stories"} >
                    <img src={storyIcon} alt="stories" />
                </NavLink>
                <div onClick={()=>{setTimeout(()=>{setMenu(!menu)})}} className={CSS.link}>
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