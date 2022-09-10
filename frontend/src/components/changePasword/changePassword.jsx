import CSS from "./changePassword.module.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function ChangePassword (props) {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordR, setNewPasswordR] = useState("")

    function submit () {
        if (password && newPassword && newPasswordR === newPassword) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "old": password,
                    "new": newPassword
                })
            }
            fetch("http://localhost:3000/set/password", requestOptions)
            .then(res => res.json())
            .then(data=>{
                if (data.success) document.location.replace("/")
                else props.setError(data.message)
            }).catch(()=>{
                props.setError("Something went wrong. Try again!")
            })
        }
    }

    return (
        <div className={CSS.wrapper}>
            <div className={CSS.content}>
                <p>Change password</p>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Current password"/>
                <input onChange={(e)=>{setNewPassword(e.target.value)}} type="password" placeholder="New password"/>
                <input onChange={(e)=>{setNewPasswordR(e.target.value)}} type="password" placeholder="Repeat new password"/>
                <div className={CSS.row}>
                    <div onClick={()=>{navigate("/profile")}} className={CSS.button}>Cancel</div>
                    <div onClick={submit} className={CSS.button + " " + CSS.delete}>Submit</div>
                </div>
            </div>
        </div>
    )
}