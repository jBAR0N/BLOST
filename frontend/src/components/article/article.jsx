import React , {useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import CSS from "./article.module.css"
import homeIcon from "./img/home.svg"

export default function Article () {
    const {article} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3000/getArticle/" + article)
    }, [article])

    return(
        <React.Fragment>
            <div className={CSS.header}>
                <img onClick={()=>{navigate("/")}} src={homeIcon} alt="home" className={CSS.back}/>
                <div className={CSS.share}>Share</div>
            </div>
        </React.Fragment>
    )
}