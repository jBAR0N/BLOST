import CSS from "./followed.module.css"
import Writer from "../writer/writer"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Followed (props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (!props.user.email) navigate("/login", {replace: true})
    }, [props])
    
    return (
        <div className={CSS.content}>
            <div className={CSS.heading}>Writers</div>
            <div className={CSS.writers}>
                <Writer name="hello there"/>
                <Writer name="hello there"/>
                <Writer name="hello there"/>
            </div>
            <div className={CSS.heading}>Posts</div>
        </div>
    )
}