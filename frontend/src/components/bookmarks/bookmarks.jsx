import CSS from "./bookmarks.module.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Bookmarks (props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (!props.user.email) navigate("/login", {replace: true})
    }, [props])

    return (
        <div className={CSS.content}>bookmarks</div>
    )
}