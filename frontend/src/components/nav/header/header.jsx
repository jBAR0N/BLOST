import React, { useEffect, useState } from "react"
import CSS from "./header.module.css"
import SearchIcon from "./img/search.svg"
import linkIcon from "./img/link.svg"
import signinIcon from "./img/signin.svg"
import signoutIcon from "./img/signout.svg"
import bellIcon from "./img/bell.svg"
import sunIcon from "./img/sun.svg"
import moonIcon from "./img/moon.svg"
import userIcon from "./img/user.svg"
import { useNavigate } from "react-router-dom"

export default function Header (props) {
    const navigate = useNavigate()

    const [menuHidden, setMenuHidden] = useState(true)
    const [dark, setDark] = useState(()=>{
        return(localStorage.getItem("blost-darkmode") === "true")
    })

    useEffect(()=>{
        document.body.addEventListener("click", hideMenu)
        return ()=>{
            document.body.removeEventListener("click", hideMenu)
        }
    })

    useEffect(()=>{
        if (dark) {
            document.body.classList.add("dark")
            localStorage.setItem("blost-darkmode", dark)
        } else {
            document.body.classList.remove("dark")
            localStorage.setItem("blost-darkmode", dark)
        }
    },[dark])

    function hideMenu () {
        if (!menuHidden) setMenuHidden(true)
    }

    function showMenu (e) {
        e.stopPropagation()
        if (menuHidden) setMenuHidden(false)
    }

    function logout () {
        fetch("http://localhost:3000/logOut").then(document.location.reload())
    }

    return (
        <div className={CSS.header}>
            <div className={CSS.searchWr}>
                <input placeholder="Search" type="text" className={CSS.search}/>
                <img alt="Search" className={CSS.searchIcon} src={SearchIcon}/>
            </div>
            <div className={CSS.notificationButton}>
                <img src={bellIcon} alt="notifications"/>
            </div>
            <img onClick={(e)=>{showMenu(e)}} className={CSS.accountImg} src={props.img} alt="account" />
            <div style={{display: (menuHidden? "none" : "block")}} className={CSS.menu}>
                <div className={CSS.menuRow}>
                    <div className={CSS.menuLink}>About</div>
                    <img className={CSS.icon} src={linkIcon} alt="link" />
                </div>
                <div onClick={()=>{setDark(!dark)}} className={CSS.menuRow}>
                    <div style={{display: (dark? "none": "block")}} className={CSS.menuLink}>Dark theme</div>
                    <div style={{display: (dark? "block": "none")}} className={CSS.menuLink}>Light theme</div>
                    <img style={{display: (dark? "none": "block")}} className={CSS.icon} src={moonIcon} alt="link" />
                    <img style={{display: (dark? "block": "none")}} className={CSS.icon} src={sunIcon} alt="link" />
                </div>
                <div style={{display: (props.user.email === undefined? "flex" : "none")}} onClick={()=>{navigate("/login")}} className={CSS.menuRow}>
                    <div className={CSS.menuLink}>Sign in</div>
                    <img className={CSS.icon} src={signinIcon} alt="link" />
                </div>
                <div style={{display: props.user.username === undefined? "none": "flex"}} className={CSS.menuRow} onClick={()=>{navigate("/profile/edit")}}>
                    <div className={CSS.menuLink}>{props.user.username === null? props.user.email: props.user.username}</div>
                    <img className={CSS.icon} src={userIcon} alt="link" />
                </div>
                <div style={{display: (props.user.email === undefined? "none" : "flex")}} onClick={logout} className={CSS.menuRow}>
                    <div className={CSS.menuLink}>Log out</div>
                    <img className={CSS.icon} src={signoutIcon} alt="link" />
                </div>
            </div>
        </div>
    )
}