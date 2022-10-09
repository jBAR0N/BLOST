import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CSS from "./notifications.module.css"

const Notifications = ({setUnread}) => {
    const [notifications, setNotificaions] = useState([])
    const [finished, setFinished] = useState(false)

    //load notification
    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/notifications", {method: "POST"})
        .then(res => res.json())
        .then(data => {
            setFinished(true)
            if (!data.success) {
                setNotificaions(data.content)
                setUnread(false)
            }
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
            {(finished && notifications.length === 0) && <div className={CSS.nothing}>You're all caught up.</div>}
        </React.Fragment>
    )
}

const Notification = ({item: {id, name, title}}) => {
    const [deleted, setDeleted] = useState(false)

    // delete notification and hide it
    const deleteNot = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: id})
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
                <Link to={"/user/" + name}>{name}</Link>
                <div onClick={deleteNot} className={CSS.delete}>Delete</div>
            </div>
            <Link to={"/story/" + id}>{title}</Link>
        </div>
    )
}

export default Notifications