import React, { useEffect, useState } from "react"
import CSS from "./header.module.css"
import SearchIcon from "./img/search.svg"
import linkIcon from "./img/link.svg"
import signinIcon from "./img/signin.svg"
import signoutIcon from "./img/signout.svg"
import bellIcon from "./img/bell.svg"
import userIcon from "./img/user.svg"
import { useNavigate } from "react-router-dom"

//TODO make menu look like google cal menu plus box-shadow

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

    function logout () {
        fetch("http://localhost:3000/logOut").then(document.location.reload())
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
            <div style={{display: (menuHidden? "none" : "block")}} className={CSS.menu}>
                <div className={CSS.menuRow}>
                    <div className={CSS.menuLink}>About</div>
                    <img className={CSS.icon} src={linkIcon} alt="link" />
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