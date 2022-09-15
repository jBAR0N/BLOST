import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CSS from "./useredit.module.css"

export default function UserEdit (props) {
    const navigate = useNavigate()
    function uploadFile (file) {
        const formData = new FormData()
        formData.append('image', file)
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        fetch("http://localhost:3000/set/image", requestOptions)
        .then(res => res.json())
        .then(res => {
            if (res.success) window.location.reload()
            else props.setError("Something went wrong. Try again!")
        }).catch(()=>{
            props.setError("Something went wrong. Try again!")
        })
    }

    return (
        <div className={CSS.contentWr}>
            <InfoRow inputHeight={"20px"} setError={props.setError} name="Name" current={props.user.username}/>
            <InfoRow inputHeight={"20px"} setError={props.setError} name="Email" current={props.user.email}/>
            <InfoRow inputHeight={"100px"} setError={props.setError} name="Description" current={props.user.description}/>
            <div className={CSS.infoGroup}>
                <label className={CSS.uploadLabel} htmlFor="file">
                    <div style={{marginTop: "5px"}} className={CSS.editButton + " " + CSS.button}><p>Upload image</p></div>
                </label>
                <input onChange={(e)=>{uploadFile(e.target.files[0])}} id="file" type="file" accept="image/png, image/jpg" className={CSS.upload}/>
                <div style={{marginTop: "5px"}} onClick={()=>{navigate("/profile/password")}} className={CSS.editButton + " " + CSS.button}><p>Change password</p></div>
                <div style={{marginTop: "5px"}} onClick={()=>{navigate("/profile/delete")}} className={CSS.deleteButton + " " + CSS.button}><p>Delete account</p></div>
            </div>
        </div>
    )
}

function InfoRow (props) {
    const [input, setInput] = useState("")

    function submit () {
        if (input !== "") {
            let requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({object: input})
            }
            fetch("http://localhost:3000/set/" + props.name.toLowerCase(), requestOptions)
            .then(res => res.json())
            .then(data =>{
                if (data.success) window.location.reload()
                else props.setError(data.message)
            }).catch(()=>{
                props.setError("Something went wrong. Try again!")
            })
        }
    }

    useEffect(()=>{
        setInput(props.current)
    }, [props])

    return (
        <div className={CSS.infoRow}>
            <div className={CSS.infoGroup}>
                <div className={CSS.infoSpec}>{props.name}:&nbsp;</div>
                <div onClick={submit} className={CSS.submitButton + " " + CSS.button}>Submit</div>
                <div onClick={()=>{setInput(props.current)}} className={CSS.editButton + " " + CSS.button}>Reset</div>
            </div>
            <textarea value={input} onChange={e=>{setInput(e.target.value)}} type="text" className={CSS.input} style={{height: props.inputHeight}}/>
        </div>
    )
}