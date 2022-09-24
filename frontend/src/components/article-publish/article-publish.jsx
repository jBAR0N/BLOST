import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CSS from "./article-publish.module.css"

export default function PublishArticle () {
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        
    }, [])

    return (
        <div className="centered-content-wrapper">

        </div>
    )
}