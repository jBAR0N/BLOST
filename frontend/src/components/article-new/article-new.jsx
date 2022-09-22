import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CSS from "./article-new.module.css"

export default function NewArticle (props) {
    const navigate = useNavigate()
    const {user} = props

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true}) 
        else if (props.user.email && !props.user.loading && !props.user.username) navigate("/profile/new", {replace: true})
        else fetch("http://localhost:3000/set/article/new", {method: "POST"})
        .then(res => res.json())
        .then(data => {
            if (data.success) navigate("/article/edit/" + data.article, {replace: true})
            else navigate("/profile", {replace: true})
        }).catch(()=>{
            navigate("/profile", {replace: true})
        })
    }, [user])

    return (
        <div className="centered-content-wrapper">
            <div className={CSS.text}>Creating article...</div>
        </div>
    )
}