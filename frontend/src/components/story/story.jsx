import React , {useEffect} from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import CSS from "./story.module.css"
import FourOFour from "../404/404"
import bookmarkIcon from "./img/bookmark.svg"
import bookmarkedIcon from "./img/bookmarked.svg"

const Story = ({about}) => {
    const {story} = useParams()
    const [{content, title, subtitle, name, date, image}, setData] = useState({})
    const [bookmarked, setBookmarked] = useState(false)
    const [status, setStatus] = useState("")

    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/story/" + (about || about === 0? about: story))
        .then(res => res.json())
        .then(data=>{
            if (data.success) {
                setData({...data, date: formatDate(data.date)})
                setBookmarked(data.bookmarked)
                setStatus("done")
            } else setStatus("notFound")
        }).catch(()=>{setStatus("notFound")})
    }, [story, about])

    const bookmark = () => {
        const original = bookmarked
        setBookmarked(!bookmarked)
        let requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: story})
        }
        fetch("http://192.168.0.42:3000/bookmark", requestOptions)
            .then(res => res.json())
            .then(data =>{
                if (data.success) setBookmarked(data.action)
                else setBookmarked(original) 
            })
            .catch(()=>{setBookmarked(original)})
    }

    const formatDate = (date)=> ( new Date(date).toLocaleString('default', { month: 'short' }) + " " + new Date(date).getDate() + ", " + new Date(date).getFullYear() )

    return (
        status === "done"?
        <div className={CSS.contentWr}>
            {!about && about !== 0 &&
                <div className={CSS.infoRow}>
                    <Link to={"/user/" + name} className={CSS.userWr}>
                        <img src={image? ("/image/" + image): "/img/user.png"} alt="" className={CSS.userImg} />
                        <div className={CSS.infoWr}>
                            <div className={CSS.username}>{name}</div>
                            <div className={CSS.date}>{date}</div>
                        </div>
                    </Link>
                    <img className={CSS.bookmark} onClick={bookmark} src={bookmarked? bookmarkedIcon: bookmarkIcon} alt="bookmark" />
                </div>
            }
            <div className="font-a-title">{title}</div>
            <div className="font-a-text">{subtitle}</div>
            { content &&
                content.map(item => (
                    <Section item={item}/>
                ))
            }
        </div>
        :status === "notFound" && <FourOFour/>
    )
}

const Section = ({item: {type, content, title}}) => (
    <div className={CSS.section}>
        <div className="font-a-subtitle">{title}</div>
        {type === "text"?
        <div className="font-a-text">{content}</div>
        :type === "image"?
        <img alt="" className="a-image" src={content? ("/image/" + content): "/img/placeholder.jpg"}></img>
        :""
        }
    </div>
)

export default Story