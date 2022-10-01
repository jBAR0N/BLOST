import React, {useState, useEffect} from "react"
import CSS from "./login.module.css"
import { useNavigate } from "react-router-dom"

export default function Login (props) {
    const navigate = useNavigate()

    const [signUp, setSignUp] = useState(true)
    const [Email, SetEmail] = useState("")
    const [Password, SetPassword] = useState("")
    const [name, setName] = useState("")
    const [privacyAccepted, SetPrivacyAccepted] = useState(false)

    useEffect(()=>{
        if (props.user.email) navigate("/", {replace: true})
    }, [props])

    function submitUp(e) {
        e.preventDefault()
        if (Password && name && privacyAccepted && Email) sendForm("signUp")
    }

    function submitIn(e) {
        e.preventDefault()
        if(Email && Password) sendForm("signIn")
    }

    function sendForm (path) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": Email,
                "password": Password,
                "name": name
            })
        }
        fetch("http://192.168.0.42:3000/" + path, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            if (data.success) document.location.replace("/");
        })
    }

    return (
        <div className={CSS.content}>
            <div className="page-heading-wrapper">
                <div className="page-heading">Authenticate</div>
            </div>
            <div className="card-wrapper">
                <div onClick={()=>{setSignUp(true)}} className={signUp? "card active": "card"}>Sign up</div>
                <div onClick={()=>{setSignUp(false)}} className={!signUp? "card active": "card"}>Sign in</div>
            </div>
            <form className={CSS.form}>
                <input onChange={(e)=>{SetEmail(e.target.value)}} className={CSS.input} placeholder="Email" type="email"/>
                <input onChange={(e)=>{SetPassword(e.target.value)}} className={CSS.input} placeholder="Password" type="password" />
                {
                    signUp?
                    <React.Fragment>
                        <input onChange={(e)=>{setName(e.target.value)}} value={name} className={CSS.input} placeholder="Username" type="text" />
                        <div className={CSS.formRow}>
                            <input type="checkbox" className={CSS.privacyCheckbox} onChange={()=>{SetPrivacyAccepted(!privacyAccepted)}} value={privacyAccepted}/>
                            <div className={CSS.privacyText}>
                                I agree to the <a rel="noreferrer" target="_blank" className={CSS.privacyLink} href="http:/192.168.0.42:3000">
                                    privacy policy
                                </a> and our <a rel="noreferrer" target="_blank" className={CSS.privacyLink} href="http:/192.168.0.42:3000">
                                    terms of use
                                </a>
                            </div>
                        </div>
                        <input onClick={(e)=>{submitUp(e)}} className={CSS.submit} value={"Sign up"} type="submit"/>
                    </React.Fragment>
                    :
                    <input onClick={(e)=>{submitIn(e)}} className={CSS.submit} value="Sign in" type="submit"/>
                }
            </form>
        </div>
    )
}