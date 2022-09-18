import CSS from "./bookmarks.module.css"
import Posts from "../posts/posts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Bookmarks (props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
        if (props.user.email && !props.user.loading && !props.user.username) navigate("/profile/new", {replace: true})
    }, [props])

    return (
        props.user.username?
        <Posts setError={props.setError} path={"bookmarks/"} children={
            <div className={CSS.heading}>Bookmarks</div>
        }/>
        :""
    )
}