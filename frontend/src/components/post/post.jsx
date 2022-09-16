import CSS from "./post.module.css"
import bookmarkIcon from "./img/bookmark.svg"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Post (props) {
    const navigate = useNavigate()
    const [img, setImg] = useState(null)
    const [date, setDate] = useState()

    useEffect(()=>{
        const creationDate = new Date (props.date)
        const currentDate = new Date
        const formatDate = 
        creationDate.getHours() + 
        ":" + creationDate.getMinutes() + 
        ", "+ creationDate.toLocaleString('default', { month: 'short' }) + 
        " " + creationDate.getDate() +
        ", " + currentDate.getFullYear()
        setDate(formatDate)

        if(props.image) {
            fetch("http://localhost:3000/image/" + props.image)
            .then(res => res.blob())
            .then(data => {setImg(URL.createObjectURL(data))})
        }
    }, [])

    return(
        <div onClick={()=>{navigate(props.draft?"/create/" + props.id:"/article/" + props.id)}} className={CSS.content}>
            <div className={CSS.row}>
                <div className={CSS.heading}>{props.title}</div>
                <img onClick={(e)=>{e.stopPropagation();}} className={CSS.bookmark} src={bookmarkIcon} alt={"bookmark"} />
            </div>
            <div className={CSS.description}>{props.subtitle}</div>
            <div className={CSS.row}>
                <div className={CSS.info}>{date}</div>
                <div onClick={(e)=>{e.stopPropagation(); navigate("/user/" + props.name)}} className={CSS.writerWr}>
                    <div className={CSS.writer}>{props.name}</div>
                    <img alt="account-img" src={img? img: "img/user.png"} className={CSS.img}/>
                </div>
            </div>
        </div>
    )
}