import CSS from "./post.module.css"
import bookmarkIcon from "./img/bookmark.svg"
import bookmarkedIcon from "./img/bookmarked.svg"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Post ({item: {bookmarked, image, id, title, subtitle, name, date}}) {
    const navigate = useNavigate()
    const [img, setImg] = useState(null)
    const [bookmark, setBookmark] = useState(bookmarked)

    useEffect(()=>{
        if(image) 
        fetch("http://192.168.0.42:3000/image/" + image)
        .then(res => res.blob())
        .then(data => {setImg(URL.createObjectURL(data))})
    }, [image])

    const formatDate = (date)=>{
        const creationDate = new Date (date)
        return creationDate.toLocaleString('default', { month: 'short' }) + " " + creationDate.getDate() + ", " + creationDate.getFullYear()
    }

    function submitBookmark () {
        const original = bookmark
        setBookmark(!bookmark)
        let requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: id})
        }
        fetch("http://192.168.0.42:3000/bookmark", requestOptions)
        .then(res => res.json())
        .then(data =>{
            if (data.success) setBookmark(data.action)
            else setBookmark(original) 
        })
        .catch(()=>{setBookmark(original)})
    }

    function openArticle () {
        navigate("/article/" + id)
    }

    return(
        <div className={CSS.content}>
            <div className={CSS.row}>
                <div onClick={openArticle} className={CSS.heading}>{title? title: "Untitled story"}</div>
                {bookmark?
                    <img onClick={submitBookmark} className={CSS.bookmark} src={bookmarkedIcon} alt={"remove bookmark"} />
                    :
                    <img onClick={submitBookmark} className={CSS.bookmark} src={bookmarkIcon} alt={"bookmark"} />
                }
            </div>
            <div onClick={openArticle}  className={CSS.description}>{subtitle}</div>
            <div className={CSS.row}>
                <div onClick={()=>{navigate("/user/" + name)}} className={CSS.writerWr}>
                    <img alt="account-img" src={img? img: "/img/user.png"} className={CSS.img}/>
                    <div className={CSS.writer}>{name}</div>
                </div>
                <div className={CSS.info}>{formatDate(date)}</div>
            </div>
        </div>
    )
}