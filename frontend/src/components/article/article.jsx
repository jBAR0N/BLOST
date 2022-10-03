import React , {useEffect} from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CSS from "./article.module.css"

export default function Article () {
    const {article} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [sections, setSections] = useState([])

    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/article/" + article)
        .then(res => res.json())
        .then(data=>{
            setTitle(data.title)
            setSubtitle(data.subtitle)
            setSections(data.content)
        })
    }, [article])

    return(
        <div className={CSS.contentWr}>
            <div className={CSS.infoRow}>

            </div>
            <div className="font-a-title">{title}</div>
            <div className="font-a-text">{subtitle}</div>
            {
                sections.map(item => (
                    <Section item={item}/>
                ))
            }
        </div>
    )
}

function Section ({item: {type, content, title}}) {
    const [img, setImg] = useState("/img/placeholder.jpg")

    useEffect(()=>{
        if(type === "image" && content) {
            fetch("http://192.168.0.42:3000/image/" + content)
            .then(res => res.blob())
            .then(data=>{
                setImg(URL.createObjectURL(data))
            })
        }
    }, [content, type])

    return (
        <div className={CSS.section}>
            <div className="font-a-subtitle">{title}</div>
            {type === "text"?
            <div className="font-a-text">{content}</div>
            :type === "image"?
            <img alt="" className="a-image" src={img}></img>
            :""
            }
        </div>
    )
}