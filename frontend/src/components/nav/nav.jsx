import CSS from "./nav.module.css"
import Logo from "./img/logo.svg"
import {Navigate, Link, Outlet, useNavigate, useMatch} from "react-router-dom"
import React, { useState, useEffect } from "react"
import SearchBox from "../nav-search/nav-search"
import Menu from "../nav-menu/nav-menu"

import homeIcon from "./img/inactive/home.svg"
import listIcon from "./img/inactive/list.svg"
import storyIcon from "./img/inactive/stories.svg"
import bellIcon from "./img/inactive/bell.svg"
import searchIcon from "./img/inactive/search.svg"

import activeHome from "./img/active/home.svg"
import activeList from "./img/active/list.svg"
import activeStory from "./img/active/stories.svg"
import activeBell from "./img/active/bell.svg"
import activeSearch from "./img/active/search.svg"


const Nav = ({user, unread, img, me}) => {
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
            <Menu user={user} setMenu={setMenu} menu={menu} />
            <div className={CSS.nav}>
                <img onClick={()=>{navigate("/")}} style={{marginBottom: "auto"}} src={Logo} alt="Logo" className={CSS.logo}/>
                <NavLink to="/" end icon={homeIcon} active={activeHome}/>
                <div onClick={()=>{setTimeout(()=>{setSearch(!search)})}} className={CSS.link}>
                    <img src={search? activeSearch: searchIcon} alt="search" />
                    <SearchBox setSearch={setSearch} search={search} />
                </div>
                <NavLink to="/me/list" icon={listIcon} active={activeList}/>
                <NavLink to="/me/notifications" icon={bellIcon} active={activeBell} unread={unread}/>
                <NavLink to="/me/stories/" icon={storyIcon} active={activeStory}/>
                <div onClick={()=>{setTimeout(()=>{setMenu(!menu)})}} className={CSS.link}>
                    <img className={CSS.userImg} src={img} alt="profile" />
                </div>
            </div>
            <div className={CSS.main}>
                <div className={CSS.content}>
                    {(!user.email && !user.loading && me)?
                        <Navigate to="/login" replace/>:
                        <Outlet/>
                    }
                </div>
            </div>
        </div>
    )
}

function NavLink ({to, end, icon, active, unread}) {
    const match = useMatch({path: to, end: (end? true: false)})

    return (
        <Link className={CSS.link} to={to}>
            {unread && <div className={CSS.notIndicator}/>}
            <img src={match? active: icon} alt="" />
        </Link>
    )
}

export default Nav