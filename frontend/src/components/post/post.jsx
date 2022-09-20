import CSS from "./post.module.css"
import bookmarkIcon from "./img/bookmark.svg"
import bookmarkedIcon from "./img/bookmarked.svg"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Post (props) {
    const navigate = useNavigate()
    const [img, setImg] = useState(null)
    const [date, setDate] = useState()
    const [bookmark, setBookmark] = useState(props.bookmarked)

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

    function submitBookmark (e) {
        e.stopPropagation();
        let requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: props.id})
        }
        fetch("http://localhost:3000/bookmark", requestOptions)
        .then(res => res.json())
        .then(data =>{
            if (data.success) setBookmark(data.action)
            else props.setError(data.message)
        })
    }

    return(
        <div onClick={()=>{navigate(props.draft?"/create/" + props.id:"/article/" + props.id)}} className={CSS.content}>
            <div className={CSS.row}>
                <div className={CSS.heading}>{props.title}</div>
                {bookmark?
                    <img onClick={submitBookmark} className={CSS.bookmark} src={bookmarkedIcon} alt={"remove bookmark"} />
                    :
                    <img onClick={submitBookmark} className={CSS.bookmark} src={bookmarkIcon} alt={"bookmark"} />
                }
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