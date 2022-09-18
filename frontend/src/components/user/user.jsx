import CSS from "./user.module.css"
import {useNavigate, useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import Posts from "../posts/posts"

export default function User (props) {
    const [credentials, setCredentials] = useState({})
    const {name} = useParams()
    const [notFound, setNotFound] = useState()
    const [img, setImg] = useState("img/user.png")
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3000/get/user/" + name)
        .then(res => res.json())
        .then(res=> {
            if (res.success) {
                setCredentials(res.content);
                if (res.content.image) {
                    fetch("http://localhost:3000/image/" + res.content.image)
                    .then(res => res.blob())
                    .then(data => {
                        setImg(URL.createObjectURL(data))
                    })
                }
            }
            else setNotFound(true)
        })
        .catch(()=>{setNotFound(true)})
    }, [name])

    return (
        notFound?
            <div className={CSS.content}>
                <div className={CSS.notFound}>User not found</div>
                <div onClick={()=>{navigate("/")}} className={CSS.return}>Back to home</div>
            </div>
            : 
            <Posts setError={props.setError} path={"user/" + name + "/"} children={
            <div>
                <div className={CSS.infoRow}>
                    <img className={CSS.img} src={img} alt="account"/>
                    <div className={CSS.name}>{credentials.name}</div>
                    <div style={{marginLeft: "auto"}} className={CSS.infoText}>x posts</div>
                    <div className={CSS.infoText}>x followers</div>
                    <div className={CSS.follow}>Follow</div>
                </div>
                <div className={CSS.description}>{credentials.description}</div>
            </div>
            }/>
    )
}