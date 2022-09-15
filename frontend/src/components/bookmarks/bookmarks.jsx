import CSS from "./bookmarks.module.css"
import Posts from "../posts/posts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Bookmarks (props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
    }, [props])

    return (
        <Posts setError={props.setError} path={"bookmarks/"} children={
            <div className={CSS.heading}>Bookmarks</div>
        }/>
    )
}