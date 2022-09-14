import CSS from "./followed.module.css"
import Writer from "../writer/writer"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Posts from "../posts/posts"

export default function Followed (props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
    }, [props])
    
    return (
        <Posts setError={props.setError} path={"followed/"} children={
            <div className={CSS.content}>
                <div className={CSS.heading}>Writers</div>
                <div className={CSS.writers}>
                    <Writer name="hello there"/>
                    <Writer name="hello there"/>
                    <Writer name="hello there"/>
                </div>
                <div className={CSS.heading}>Posts</div>
            </div>
        }/>
    )
}