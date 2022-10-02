import React from "react"
import { useEffect, useState } from "react"
import CSS from "./settings.module.css"

export default function Settings (props) {
    return (
        <div className={CSS.content}>
            <div className={CSS.title}>About you</div>
            <InputSection path="name" title="Name" field={props.user.username} 
            description="Your name appears on your Profile page and as your byline and domain. It is a required field. Max 50 characters."
            />
            <InputSection path="description" title="Short bio" field={props.user.description} 
            description="Your short bio appears on your Profile and over your stories. Max 160 characters."
            />
            image
            about
            <div className={CSS.title}>Security</div>
            <InputSection path="email" title="Email" field={props.user.email} 
            description="Your email is used for signing in and sending notifications to you. It won't appear publicly."
            />
            password
            delete
        </div>
    )
}

function InputSection (props) {
    const [input, setInput] = useState("")
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        setInput(props.field)
    }, [edit])

    function submit () {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({object: input})
        }
        if (input)
        fetch("http://192.168.0.42:3000/set/" + props.path, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            if (data.success) document.location.reload();
        })
    }

    return (
        <div className={CSS.inputSection}>
            <div className={CSS.inputMain}>
                <div className={CSS.inputTitle}>{props.title}</div>
                {edit?
                    <textarea onChange={(e)=>{setInput(e.target.value)}} value={input} placeholder="" className={CSS.inputInput}/>
                :
                    <div className={CSS.inputInput}>{props.field}</div>
                }
                <div className={CSS.inputDescription}>{props.description}</div>
            </div>
            <div className={CSS.inputControl}>
                <div style={{display: edit? "block": "none"}} onClick={submit} className={CSS.inputButton}>Save</div>
                <div onClick={()=>{setEdit(!edit)}} className={CSS.inputButton}>{edit? "Cancel": "Edit"}</div>
            </div>
        </div>
    )
}