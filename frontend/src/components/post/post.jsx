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
        creationDate.toLocaleString('default', { month: 'short' }) + 
        " " + creationDate.getDate() +
        ", " + currentDate.getFullYear()
        setDate(formatDate)

        if(props.image) {
            fetch("http://192.168.0.42:3000/image/" + props.image)
            .then(res => res.blob())
            .then(data => {setImg(URL.createObjectURL(data))})
        }
    }, [])

    function submitBookmark () {
        const original = bookmark
        setBookmark(!bookmark)
        let requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: props.id})
        }
        fetch("http://192.168.0.42:3000/bookmark", requestOptions)
        .then(res => res.json())
        .then(data =>{
            if (!data.success) setBookmark(original)
        }).catch(()=>{
            setBookmark(original)
        })
    }

    function openArticle () {
        navigate(props.draft?"/article/edit/" + props.id:"/article/" + props.id)
    }

    return(
        <div className={CSS.content}>
            <div className={CSS.row}>
                <div onClick={openArticle} className={CSS.heading}>{props.title? props.title: "Untitled"}</div>
                {
                props.draft? "": 
                bookmark?
                    <img onClick={submitBookmark} className={CSS.bookmark} src={bookmarkedIcon} alt={"remove bookmark"} />
                    :
                    <img onClick={submitBookmark} className={CSS.bookmark} src={bookmarkIcon} alt={"bookmark"} />
                }
            </div>
            <div onClick={openArticle}  className={CSS.description}>{props.subtitle}</div>
            <div className={CSS.row}>
                <div onClick={()=>{navigate("/user/" + props.name)}} className={CSS.writerWr}>
                    <img alt="account-img" src={img? img: "img/user.png"} className={CSS.img}/>
                    <div className={CSS.writer}>{props.name}</div>
                </div>
                <div className={CSS.info}>{date}</div>
            </div>
        </div>
    )
}