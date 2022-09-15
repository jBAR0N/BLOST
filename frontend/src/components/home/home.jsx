import CSS from "./home.module.css"
import Posts from "../posts/posts"
import React, {useEffect, useState} from "react"
import { useParams, NavLink } from "react-router-dom"

export default function Home (props) {
    const {keyword} = useParams()
    const [tags, setTags] = useState(["haha"])



    return (
        <div className={CSS.contentWr}>
            <div className={CSS.tags}>
                <NavLink to={"/"} end className={({isActive})=>{return (isActive? CSS.active + " "+ CSS.tag: CSS.tag)}}>All</NavLink>
                <div className={CSS.active + " " + CSS.tag} style={{display: props.mode==="search"? "block": "none"}}>"{keyword}"</div>
                {
                    tags.map((item)=>
                        <NavLink to={"/tag/"+ item} end className={({isActive})=>{return (isActive? CSS.active + " "+ CSS.tag: CSS.tag)}}>{item}</NavLink>
                    )
                }
            </div>    
            <Posts setError={props.setError} path={
                props.mode === "date"? "date/" : "" +
                props.mode === "search"? "search/" + keyword + "/" : "" + 
                props.mode === "tag"? "tag/" + keyword + "/" : ""
                }/>
        </div>
    )
}