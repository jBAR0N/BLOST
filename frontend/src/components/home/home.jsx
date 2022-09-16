import CSS from "./home.module.css"
import Posts from "../posts/posts"
import React, {useEffect, useState, useRef} from "react"
import { useParams, NavLink } from "react-router-dom"

export default function Home (props) {
    const tagSlider = useRef()
    const sliderWr = useRef()
    const {keyword} = useParams()
    const [tags, setTags] = useState([])
    const [slider, setSlider] = useState(0)

    useEffect(()=>{
        fetch("http://localhost:3000/get/tags")
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setTags(data.content)
            } else {
                props.setError("Failed to load tags!")
            }
        })
        .catch(()=>{
            props.setError("Failed to load tags!")
        })
    }, [])

    return (
        <div className={CSS.contentWr}>
            <div className={CSS.tags}>
                <NavLink to={"/"} end className={({isActive})=>{return (isActive? CSS.active + " "+ CSS.tag: CSS.tag)}}>All</NavLink>
                <div className={CSS.active + " " + CSS.tag} style={{display: props.mode==="search"? "block": "none"}}>"{keyword}"</div>
                <div onClick={()=>{if(slider < 0) setSlider(slider + 1)}} className={CSS.tag}>{"<"}</div>
                <div ref={sliderWr} className={CSS.scrollWr}>
                    <div ref={tagSlider} style={{left: "calc(" + slider + " * 50%)"}} className={CSS.tagSlider}>
                        {
                            tags.map((item)=>
                                <NavLink to={"/tag/"+ item.name} end className={({isActive})=>{return (isActive? CSS.active + " "+ CSS.tag: CSS.tag)}}>{item.name}</NavLink>
                            )
                        }
                    </div>
                </div>
                <div onClick={()=>{if(tagSlider.current.clientWidth > sliderWr.current.clientWidth * ((-slider + 1) / 2)) setSlider(slider - 1)}} className={CSS.tag}>{">"}</div>
            </div>    
            <Posts setError={props.setError} path={
                props.mode === "date"? "date/" : "" +
                props.mode === "search"? "search/" + keyword + "/" : "" + 
                props.mode === "tag"? "tag/" + keyword + "/" : ""
                }/>
        </div>
    )
}