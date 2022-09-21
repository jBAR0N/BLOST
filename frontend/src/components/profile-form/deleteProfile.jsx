import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CSS from "./profile-form.module.css"

export default function DeleteProfile (props) {
    const navigate = useNavigate()
    const [input, setInput] = useState("")

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
        if (props.user.email && !props.user.loading && !props.user.username) navigate("/profile/new", {replace: true})
    }, [props])

    function submit () {
        if (input) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "password": input,
                })
            }
            fetch("http://localhost:3000/delete/profile", requestOptions)
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
            <div className={CSS.content}>
                <div className={CSS.heading}>Delete account</div>
                <input onChange={(e)=>{setInput(e.target.value)}} className="form-input" type="password" placeholder="Pasword"/>
                <div className={CSS.warning}>Do you really want to delete your account? All your content will be gone!</div>
                <div className={CSS.row}>
                    <div onClick={()=>{navigate("/profile/edit")}} className={CSS.button}>Cancel</div>
                    <div onClick={submit} className={CSS.button+ " "+ CSS.submit}>Delete</div>
                </div>
            </div>
        </div>
    )
}