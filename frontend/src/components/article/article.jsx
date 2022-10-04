import React , {useEffect} from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useFormatDate from "../../hooks/useFormatDate"
import CSS from "./article.module.css"

export default function Article () {
    const formatDate = useFormatDate()
    const {article} = useParams()
    const navigate = useNavigate()
    const [{content, title, subtitle, name, date}, setData] = useState({})
    const [img, setImg] = useState("/img/user.png")

    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/article/" + article)
        .then(res => res.json())
        .then(data=>{
            setData({...data, date: formatDate(data.date)})
            if (data.image)
            fetch("http://192.168.0.42:3000/image/")
            .then(res => res.blob())
            .then(data=>{setImg(URL.createObjectURL(data))})
        })
    }, [article])

    return(
        <div className={CSS.contentWr}>
            <div className={CSS.infoRow}>
                <img src={img} alt="" className={CSS.userImg} />
                <div className={CSS.infoWr}>
                    <div className={CSS.username}>{name}</div>
                    <div className={CSS.date}>{date}</div>
                </div>
            </div>
            <div className="font-a-title">{title}</div>
            <div className="font-a-text">{subtitle}</div>
            { content &&
                content.map(item => (
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