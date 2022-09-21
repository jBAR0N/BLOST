import CSS from "./writer.module.css"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"

export default function User (props) {
    const navigate = useNavigate()
    const [img, setImg] = useState("img/user.png")

    function redirect () {
        navigate("/user/" + props.name)
    }

    useEffect(()=>{
        if(props.image)
        fetch("http://localhost:3000/image/"+ props.image)
        .then(res => res.blob())
        .then(data=>{
            setImg(URL.createObjectURL(data))
        })
    }, [])

    return (
        <div onClick={redirect} className={CSS.user}>
            <img src={img} alt="" className={CSS.img}></img>
            <div className={CSS.name}>{props.name}</div>
        </div>
    )
}