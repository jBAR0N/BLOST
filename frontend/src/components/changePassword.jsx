import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function ChangePassword (props) {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordR, setNewPasswordR] = useState("")

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
        if (props.user.email && !props.user.loading && !props.user.username) navigate("/profile/new", {replace: true})
    }, [props])

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
        <div className="centered-content-wrapper">
            <div className="profile-form-content">
                <div className="profile-form-heading">Change password</div>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-input" placeholder="Current password"/>
                <input onChange={(e)=>{setNewPassword(e.target.value)}} type="password" className="form-input" placeholder="New password"/>
                <input onChange={(e)=>{setNewPasswordR(e.target.value)}} type="password" className="form-input" placeholder="Repeat new password"/>
                <div className="row">
                    <div onClick={()=>{navigate("/profile/edit")}} className="profile-form-button">Cancel</div>
                    <div onClick={submit} className="profile-form-button submit">Submit</div>
                </div>
            </div>
        </div>
    )
}