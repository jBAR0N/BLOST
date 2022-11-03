import CSS from "./previews-story.module.css"
import bookmarkIcon from "./img/bookmark.svg"
import bookmarkedIcon from "./img/bookmarked.svg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Post = ({item: {bookmarked, image, id, title, subtitle, name, date}}) => {
    const navigate = useNavigate()
    const [bookmark, setBookmark] = useState(bookmarked)

    const formatDate = date => ( new Date(date).toLocaleString('default', { month: 'short' }) + " " + new Date(date).getDate() + ", " + new Date(date).getFullYear() )

    const submitBookmark = () => {
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

    const openStory = () => navigate("/story/" + id)

    return(
        <div className={CSS.content}>
            <div className={CSS.row}>
                <div onClick={openStory} className={CSS.heading}>{title? title: "Untitled story"}</div>
                {bookmark?
                    <img onClick={submitBookmark} className={CSS.bookmark} src={bookmarkedIcon} alt={"remove bookmark"} />
                    :
                    <img onClick={submitBookmark} className={CSS.bookmark} src={bookmarkIcon} alt={"bookmark"} />
                }
            </div>
            <div onClick={openStory}  className={CSS.description}>{subtitle}</div>
            <div className={CSS.row}>
                <div onClick={()=>{navigate("/user/" + name)}} className={CSS.writerWr}>
                    <img alt="account-img" src={image? ("/image/" + image): "/img/user.png"} className={CSS.img}/>
                    <div className={CSS.writer}>{name}</div>
                </div>
                <div className={CSS.info}>{formatDate(date)}</div>
            </div>
        </div>
    )
}

export default Post