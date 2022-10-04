import CSS from "./draft.module.css"
import moreIcon from "./img/more.svg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useFormatDate from "../../../hooks/useFormatDate"

export default function Draft (props) {
    const navigate = useNavigate()
    const formatDate = useFormatDate()
    const [menu, setMenu] = useState(false)
    const [deleted, setDeleted] = useState(false)

    useEffect(()=>{
        function handleClick () {
            if (menu) setMenu(false)
        }
        window.addEventListener("click", handleClick)
        return ()=>{window.removeEventListener("click", handleClick)}
    })

    function openArticle () {
        if (props.public) navigate("/article/" + props.item.id)
        else navigate("/article/edit/" + props.item.id)
    }

    function deleteArticle () {
        let requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: props.item.id})
        }
        fetch("http://192.168.0.42:3000/delete/article", requestOptions)
        .then(res => res.json())
        .then(data =>{
            if (data.success) setDeleted(true)
        })
    }

    return (
        <div className={CSS.content} style={{display: deleted? "none": "block"}}>
            <div onClick={openArticle} className={CSS.heading}>{props.item.title? props.item.title: "Untitled story"}</div>
            <div className={CSS.row}>
                <div className={CSS.info}>{props.public? "Published ": "Last edited "}{formatDate(props.item.date)}</div>
                <img onClick={()=>{setTimeout(()=>{setMenu(!menu)})}} alt="more" src={moreIcon} className={CSS.menuIcon}></img>
            </div>
            <div style={{display: menu? "block":"none"}} className={CSS.menu}>
                <div onClick={()=>{navigate("/article/edit/" + props.item.id)}} className={CSS.menuRow}>Edit</div>
                <div onClick={deleteArticle} className={CSS.menuRow}>Delete</div>
            </div>
        </div>
    )
}