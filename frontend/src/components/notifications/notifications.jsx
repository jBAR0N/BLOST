import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CSS from "./notifications.module.css"

export default function Notifications ({setUnread}) {
    const [notifications, setNotificaions] = useState([])
    const [finished, setFinished] = useState(false)

    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/notifications", {method: "POST"})
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setNotificaions(data.content)
                setUnread(false)
            }
            setFinished(true)
        }).catch(()=>{
            setFinished(true)
        })
    }, [setUnread])

    return (
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Notifications</div>
            </div>
            <div className="card-wrapper"/>
            {
                notifications.map(item => (
                    <Notification item={item}/>
                ))
            }
            <div style={{display: finished && notifications.length === 0? "block": "none"}} className={CSS.nothing}>You're all caught up.</div>
        </React.Fragment>
    )
}

function Notification ({item}) {
    const [deleted, setDeleted] = useState(false)

    function deleteNot () {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: item.id})
        }
        fetch("http://192.168.0.42:3000/delete/notification", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) setDeleted(true)
        })
    }

    return (
        !deleted &&
        <div className={CSS.notification}>
            <div className={CSS.notInfoRow}>
                <Link to={"/user/" + item.name}>{item.name}</Link>
                <div onClick={deleteNot} className={CSS.delete}>Delete</div>
            </div>
            <Link to={"/article/" + item.id}>{item.title}</Link>
        </div>
    )
}