import CSS from "./previews-draft.module.css"
import moreIcon from "./img/more.svg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const PreviewsDraft = ({published, item: {id, title, date}}) => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const [deleted, setDeleted] = useState(false)

    // hide menu when user clicks anywhere in the window
    useEffect(()=>{
        const handleClick = () => { if (menu) setMenu(false) }
        window.addEventListener("click", handleClick)
        return ()=>{window.removeEventListener("click", handleClick)}
    })

    const formatDate = date => ( new Date(date).toLocaleString('default', { month: 'short' }) + " " + new Date(date).getDate() + ", " + new Date(date).getFullYear() )

    const openStory = () => { navigate((published? "/story/": "/story/edit/") + id) }

    const deleteStory = () => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        }
        fetch("http://192.168.0.42:3000/delete/story", requestOptions)
        .then(res => res.json())
        .then(data =>{
            if (data.success) setDeleted(true)
        })
    }

    return (
        <div className={CSS.content} style={{display: deleted? "none": "block"}}>
            <div onClick={openStory} className={CSS.heading}>{title? title: "Untitled story"}</div>
            <div className={CSS.row}>
                <div className={CSS.info}>{published? "Published ": "Last edited "}{formatDate(date)}</div>
                <img onClick={()=>{setTimeout(()=>{setMenu(!menu)})}} alt="more" src={moreIcon} className={CSS.menuIcon}></img>
            </div>
            <div style={{display: menu? "block":"none"}} className={CSS.menu}>
                <div onClick={()=>{navigate("/story/edit/" + id)}} className={CSS.menuRow}>Edit</div>
                <div onClick={deleteStory} className={CSS.menuRow}>Delete</div>
            </div>
        </div>
    )
}

export default PreviewsDraft