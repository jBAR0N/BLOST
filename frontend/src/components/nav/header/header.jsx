import React, { useEffect, useState } from "react"
import CSS from "./header.module.css"
import SearchIcon from "./img/search.svg"
import linkIcon from "./img/link.svg"
import signinIcon from "./img/signin.svg"
import signoutIcon from "./img/signout.svg"
import bellIcon from "./img/bell.svg"
import userIcon from "./img/user.svg"
import { useNavigate } from "react-router-dom"

export default function Header (props) {
    const navigate = useNavigate()

    const [menuHidden, setMenuHidden] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(()=>{
        document.body.addEventListener("click", hideMenu)
        return ()=>{
            document.body.removeEventListener("click", hideMenu)
        }
    })

    function hideMenu () {
        if (!menuHidden) setMenuHidden(true)
    }

    function showMenu (e) {
        if (menuHidden) {
            e.stopPropagation()
            setMenuHidden(false)
        }
    }

    function submitSearch () {
        if (search !== "") {
            navigate("/search/" + search)
            setSearch("")
        }
    }

    return (
        <div className={CSS.header}>
            <div className={CSS.searchWr}>
                <input value={search} onKeyPress={(e)=>{const keyCode = e.code || e.key; if (keyCode == 'Enter') submitSearch()}} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search" type="text" className={CSS.search}/>
                <img onClick={submitSearch} alt="Search" className={CSS.searchIcon} src={SearchIcon}/>
            </div>
            <div className={CSS.notificationButton}>
                <img src={bellIcon} alt="notifications"/>
            </div>
            <img onClick={(e)=>{showMenu(e)}} className={CSS.accountImg} src={props.img} alt="account" />
            <Menu setMenuHidden={setMenuHidden} menuHidden={menuHidden} user={props.user} img={props.img}/>
        </div>
    )
}

function Menu (props) {
    const navigate = useNavigate()
    
    function logout () {
        fetch("http://localhost:3000/logOut")
        .then(()=>{document.location = "/"})
    }

    return (
        <div style={{display: (props.menuHidden? "none" : "flex")}} onClick={(e)=>{e.stopPropagation()}} className={CSS.menu}>
            <img src={props.img} alt="profile picture" className={CSS.menuImg} />
            <div style={{display: props.user.username? "block": "none"}} className={CSS.nameInfo}>
                {props.user.username}
            </div>
            <div style={{display: props.user.email? "block": "none"}} className={CSS.emailInfo}>
                {props.user.email}
            </div>
            <div style={{display: !props.user.username && props.user.email? "block": "none"}}onClick={()=>{navigate("/profile/new")}} className={CSS.editButton}>
                Finish setup
                </div>
            <div style={{display: props.user.username? "block": "none"}} onClick={()=>{navigate("/profile/edit"); props.setMenuHidden(true)}} className={CSS.editButton}>
                Account settings
            </div>
            <div className={CSS.seperator}/>
            <div className={CSS.authButton} style={{display: (props.user.email? "none" : "flex")}} onClick={()=>{navigate("/login")}}>
                Sign in
            </div>
            <div className={CSS.authButton} style={{display: (props.user.email? "flex" : "none")}} onClick={logout}>
                Log out
            </div>
            <div className={CSS.seperator}/>
            <div className={CSS.menuLinks}>
                <a href="/about">About</a>&nbsp;-&nbsp; <a href="/terms">Privacy policy</a>
            </div>
        </div>
    )
}