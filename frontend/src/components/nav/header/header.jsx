import React, { useEffect, useState } from "react"
import CSS from "./header.module.css"
import SearchIcon from "./img/search.svg"
import bellIcon from "./img/bell.svg"
import trashIcon from "./img/trash.svg"
import { NavLink, useNavigate } from "react-router-dom"

export default function Header (props) {
    const navigate = useNavigate()

    const [menuHidden, setMenuHidden] = useState(true)
    const [notHidden, setNotHidden] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(()=>{
        document.body.addEventListener("click", hideMenu)
        document.body.addEventListener("click", hideNot)
        return ()=>{
            document.body.removeEventListener("click", hideMenu)
            document.body.removeEventListener("click", hideNot)
        }
    })

    function hideMenu () {
        if (!menuHidden) setMenuHidden(true)
    }

    function showMenu (e) {
        if (menuHidden) {
            e.stopPropagation()
            setNotHidden(true)
            setMenuHidden(false)
        }
    }

    function hideNot () {
        if (!notHidden) setNotHidden(true)
    }

    function showNot (e) {
        if (notHidden) {
            e.stopPropagation()
            setMenuHidden(true)
            setNotHidden(false)
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
            <img src={bellIcon} onClick={showNot} className={CSS.notificationButton} alt="notifications"/>
            <Notification setNotHidden={setNotHidden} notHidden={notHidden} user={props.user}/>
            <img onClick={showMenu} className={CSS.accountImg} src={props.img} alt="account" />
            <Menu setMenuHidden={setMenuHidden} menuHidden={menuHidden} user={props.user} img={props.img}/>
        </div>
    )
}

function Notification (props) {
    const [notifications, setNotifications] = useState([])
    const {notHidden} = props

    useEffect(()=>{
        loadNotification()
    }, [])

    useEffect(()=>{
        if (!notHidden)
        var requestOptions = {
            method: "POST"
        }
        fetch ("http://localhost:3000/set/notified", requestOptions)
    }, [notHidden])

    function loadNotification () {
        fetch("http://localhost:3000/get/notifications")
        .then(res => res.json())
        .then(data => {
            if (data.success) setNotifications(data)
        })
    }

    function deleteNot (content) {
        let requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: content})
        }
        fetch("http://localhost:3000/delete/notification", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) loadNotification()
        })
    }

    return (
        <div style={{display: (props.notHidden? "none" : "flex")}} onClick={(e)=>{e.stopPropagation()}} className={CSS.notBox}>
            <div className={CSS.notHeading}>Notifications</div>
            <div style={{overflow: "auto"}}>
            {
                notifications.map((item)=>(
                    <div className={CSS.notRow}>
                        <NavLink to={"article/" + item.id} className={CSS.notification}>
                            <NavLink onClick={()=>{props.setNotHidden(true)}} to={"user/" + item.user}>{item.user}</NavLink> posted a new Article
                            <div>{item.content}</div>
                        </NavLink>
                        <img onClick={()=>{deleteNot(item.id)}} src={trashIcon} alt="delete" />
                    </div>
                ))
            }
            <div className={CSS.upToDate} style={{display: notifications.length === 0? "block" : "none"}}>You're up to date!</div>
            </div>
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