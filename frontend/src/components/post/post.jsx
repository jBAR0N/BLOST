import CSS from "./post.module.css"
import bookmarkIcon from "./img/bookmark.svg"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

//TODO format date
export default function Post (props) {
    const navigate = useNavigate()
    const [img, setImg] = useState(null)

    useEffect(()=>{
        if(props.image) {
            fetch("http://localhost:3000/image/" + props.image)
            .then(res => res.blob())
            .then(data => {setImg(URL.createObjectURL(data))})
        }
    }, [])

    return(
        <div onClick={()=>{navigate("/article/" + props.id)}} className={CSS.content}>
            <div className={CSS.row}>
                <div className={CSS.heading}>{props.title}</div>
                <img onClick={(e)=>{e.stopPropagation();}} className={CSS.bookmark} src={bookmarkIcon} alt={"bookmark"} />
            </div>
            <div className={CSS.description}>{props.subtitle}</div>
            <div className={CSS.row}>
                <div className={CSS.info}>{props.date}</div>
                <div onClick={(e)=>{e.stopPropagation(); navigate("/user/" + props.name)}} className={CSS.writerWr}>
                    <div className={CSS.writer}>{props.name}</div>
                    <img alt="account-img" src={img? img: "img/user.png"} className={CSS.img}/>
                </div>
            </div>
        </div>
    )
}