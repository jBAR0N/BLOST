import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CSS from "./notifications.module.css"

export default function Notifications (props) {
    const [notifications, setNotificaions] = useState([])
    const [finished, setFinished] = useState(false)

    useEffect(()=>{
        reload()
    }, [])

    function reload () {
        fetch("http://192.168.0.42:3000/get/notifications", {method: "POST"})
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setNotificaions(data.content)
                props.setUnread(false)
            }
            setFinished(true)
        }).catch(()=>{
            setFinished(true)
        })
    }

    return (
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Notifications</div>
            </div>
            <div className="card-wrapper"/>
            {
                notifications.map(item => (
                    <Notification item={item} reload={reload}/>
                ))
            }
            <div style={{display: finished && notifications.length === 0? "block": "none"}} className={CSS.nothing}>You're all caught up.</div>
        </React.Fragment>
    )
}

function Notification (props) {

    function deleteNot () {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: props.item.id})
        }
        fetch("http://192.168.0.42:3000/delete/notification", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) props.reload()
        })
    }

    return (
        <div className={CSS.notification}>
            <div className={CSS.notInfoRow}>
                <Link to={"/user/" + props.item.name}>{props.item.name}</Link>
                <div onClick={deleteNot} className={CSS.delete}>Delete</div>
            </div>
            <Link to={"/article/" + props.item.id}>{props.item.title}</Link>
        </div>
    )
}