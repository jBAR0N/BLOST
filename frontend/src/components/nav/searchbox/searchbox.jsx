import CSS from "./searchbox.module.css"
import arrowIcon from "./img/arrow.svg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function SearchBox (props) {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")

    function redirect () {
        setSearch("")
        navigate("/search/" + search)
        props.setSearch(false)
    }

    return (
        <div style={{display: props.search? "flex":"none" }} onClick={(e)=>{e.stopPropagation()}} className={CSS.content}>
            <input onChange={(e)=>{setSearch(e.target.value)}} value={search} onKeyDown={(e)=>{if (e.key === "Enter") redirect()}} placeholder="Search" type="text" className={CSS.input}/>
            <img onClick={redirect} className={CSS.icon} src={arrowIcon}/>
        </div>
    )
}