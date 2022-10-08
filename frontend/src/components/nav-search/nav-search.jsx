import CSS from "./nav-search.module.css"
import arrowIcon from "./img/arrow.svg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const SearchBox = ({search, setSearch}) => {
    const navigate = useNavigate()
    const [input, setInput] = useState("")

    const redirect = () => {
        if (!input) return;
        setSearch("")
        navigate("/search/" + input)
        setSearch(false)
    }

    return (
        search &&
        <div onClick={e=>{e.stopPropagation()}} className={CSS.content}>
            <input onChange={e=>{setInput(e.target.value)}} value={input} onKeyDown={(e)=>{if (e.key === "Enter") redirect()}} placeholder="Search" type="text" className={CSS.input}/>
            <img alt="submit" onClick={redirect} className={CSS.icon} src={arrowIcon}/>
        </div>
    )
}

export default SearchBox