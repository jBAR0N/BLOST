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
        fetch("http://localhost:3000/get/article/" + article)
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
            <div className={CSS.title}>{title}</div>
            <div className={CSS.subtitle}>{subtitle}</div>
            {
                sections.map(item => (
                    <Section item={item}/>
                ))
            }
        </div>
    )
}

function Section (props) {
    const [img, setImg] = useState("/img/placeholder.jpg")

    useEffect(()=>{
        if(props.item.type === "image" && props.item.content) {
            fetch("http://localhost:3000/image/" + props.item.content)
            .then(res => res.blob())
            .then(data=>{
                setImg(URL.createObjectURL(data))
            })
        }
    }, [])

    return (
        <div className={CSS.section}>
            <div className={CSS.sectionTitle}>{props.item.title}</div>
            {props.item.type === "text"?
            <div className={CSS.sectionContent}>{props.item.content}</div>
            :props.item.type === "image"?
            <img alt="" className={CSS.sectionImg} src={img}></img>
            :""
            }
        </div>
    )
}