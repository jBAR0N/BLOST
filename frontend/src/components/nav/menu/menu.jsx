import React from "react"
import { useNavigate } from "react-router-dom"
import CSS from "./menu.module.css"

export default function Menu (props) {
    const navigate = useNavigate()

    function logout () {
        fetch("http://192.168.0.42:3000/logout")
        .then(res => res.json())
        .then(data =>{
            if (data.success) document.location = "/"
        })
    }

    function redirect (path) {
        navigate(path)
        props.setMenu(false)
    }

    return (
        <div className={CSS.content} onClick={(e)=>{e.stopPropagation()}} style={{display: props.menu? "flex":"none"}}>
            {props.user.email?
                <React.Fragment>
                    <div className={CSS.mobile}>
                        <div onClick={()=>{redirect("/me/list")}} className={CSS.row}>Reading list</div>
                        <div onClick={()=>{redirect("/me/stories/drafts")}} className={CSS.row}>Your stories</div>
                        <div className={CSS.seperator}/>
                    </div>
                    <div onClick={logout} className={CSS.row}>Sign out</div>
                    <div onClick={()=>{redirect("/me/settings")}} className={CSS.row}>Settings</div>
                    <div className={CSS.seperator}/>
                    <div className={CSS.name}>{props.user.username}</div>
                    <div className={CSS.email}>{props.user.email}</div>
                    <div onClick={()=>{redirect("/me")}} className={CSS.view}>View profile</div>
                </React.Fragment>
                :
                <div className={CSS.view + " " + CSS.signin} onClick={()=>{redirect("/login")}}>Sign in</div>
            }
            <div className={CSS.seperator}/>
            <div className={CSS.about}><a href="/terms">Terms of use</a> • <a href="/privacy">Privacy policy</a> • <a href="/about">About</a></div>
        </div>
    )
}