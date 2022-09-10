import CSS from "./user.module.css"
import {useNavigate, useParams} from "react-router-dom"
import { useEffect, useState } from "react"

export default function User () {
    const [credentials, setCredentials] = useState({})
    const {name} = useParams()
    const [notFound, setNotFound] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3000/get/user/" + name)
        .then(res => res.json())
        .then(res=> {
            if (res.success === false) 
            setNotFound(true)
            else setCredentials(res);})
        .catch(()=>{setNotFound(true)})
    }, [name])

    return (
        notFound?
            <div className={CSS.content}>
                <div className={CSS.notFound}>User not found</div>
                <div onClick={()=>{navigate("/")}} className={CSS.return}>Back to home</div>
            </div>
            : 
            <div>
                <div className={CSS.infoRow}>
                    <img className={CSS.img} src={""} alt="account"/>
                    <div className={CSS.name}>{credentials.name}</div>
                    <div className={CSS.follwers}>x followers</div>
                    <div className={CSS.follow}>Follow</div>
                </div>
                <div className={CSS.description}>{credentials.description}</div>
            </div>
    )
}