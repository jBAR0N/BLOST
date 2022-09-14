import {useState, useEffect} from "react"
import CSS from "./login.module.css"
import Logo from "./img/Logo.svg"
import { useNavigate } from "react-router-dom"

export default function Login (props) {
    const navigate = useNavigate()
    const [signUp, setSignUp] = useState(true)
    const [upEmail, SetUpEmail] = useState("")
    const [upPassword, SetUpPassword] = useState("")
    const [upSecondPassword, SetUpSecondPassword] = useState("")
    const [inEmail, SetInEmail] = useState("")
    const [inPassword, SetInPassword] = useState("")
    const [privacyAccepted, SetPrivacyAccepted] = useState(false)

    useEffect(()=>{
        if (props.user.email) {
            navigate("/", {replace: true})
        }
    }, [props])

    function submitUp(e) {
        e.preventDefault()
        if (upPassword === upSecondPassword && privacyAccepted && upEmail !== "" && upPassword !== "") {
            sendForm(upEmail, upPassword, "signUp", "/profile/new")
        } else if (upPassword !== upSecondPassword) {
            props.setError("Please check password and repeat it correctly!")
        }
    }

    function submitIn(e) {
        e.preventDefault()
        if(inEmail !=="" && inPassword !== "") {
            sendForm(inEmail, inPassword, "signIn", "/")
        }
    }

    function sendForm (email, password, path, redirect) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
        fetch("http://localhost:3000/" + path, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            if (data.success) { document.location.replace(redirect); }
            else { props.setError(data.message) }
        })
        .catch(()=>{props.setError("Something went wrong. Try again!")})
    }

    return (
        <div className={CSS.contentWr}>
            <img onClick={()=>{navigate("/")}} className={CSS.logo} src={Logo} alt="home" />
            <div className={CSS.content}>
                <div className={CSS.header}>
                    <div onClick={()=>{setSignUp(true)}} className={CSS.headerLink + " " + (signUp? CSS.active: "")}>Sign up</div>
                    <div onClick={()=>{setSignUp(false)}} className={CSS.headerLink + " " + (signUp? "": CSS.active)}>Sign in</div>
                </div>
                <div style={{transform: (signUp? "translate(0%)": "translate(-50%)")}} className={CSS.formsWr}>
                    <form className={CSS.form}>
                        <input onChange={(e)=>{SetUpEmail(e.target.value)}} className={CSS.input} placeholder="Email" type="email"/>
                        <input onChange={(e)=>{SetUpPassword(e.target.value)}} className={CSS.input} placeholder="Password" type="password" />
                        <input onChange={(e)=>{SetUpSecondPassword(e.target.value)}} className={CSS.input} placeholder="Password" type="password" />
                        <div className={CSS.formRow}>
                            <input type="checkbox" className={CSS.privacyCheckbox} onChange={()=>{SetPrivacyAccepted(!privacyAccepted)}} value={privacyAccepted}/>
                            <div className={CSS.privacyText}>
                                I agree to the <a rel="noreferrer" target="_blank" className={CSS.privacyLink} href="http:/localhost:3000">privacy policy</a>
                            </div>
                        </div>
                        <input onClick={(e)=>{submitUp(e)}} className={CSS.submit} value={"Sign up"} type="submit"/>
                    </form>
                    <form className={CSS.form}>
                        <input onChange={(e)=>{SetInEmail(e.target.value)}} className={CSS.input} placeholder="Email" type="email"/>
                        <input onChange={(e)=>{SetInPassword(e.target.value)}} className={CSS.input} placeholder="Password" type="password" />
                        <input onClick={(e)=>{submitIn(e)}} className={CSS.submit} value={"Sign in"} type="submit"/>
                    </form>
                </div>
            </div>
        </div>
    )
}