import CSS from "./home.module.css"
import Posts from "../posts/posts"
import React, {useEffect, useState, useRef} from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"

export default function Home (props) {
    const navigate = useNavigate()
    const tagSlider = useRef()
    const sliderWr = useRef()
    const {keyword} = useParams()
    const [tags, setTags] = useState([])
    const [slider, setSlider] = useState(0)

    useEffect(()=>{
        if (!props.user.email && !props.user.loading && props.mode === "followed") navigate("/login", {replace: true})
        if (props.user.email && !props.user.loading && !props.user.username && props.mode === "followed") navigate("/profile/new", {replace: true})
    }, [props])

    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/tags")
        .then(res => res.json())
        .then(data => {
            if(data.success) setTags(data.content)
            else props.setError(data.message)
        })
        .catch(()=>{
            props.setError("Failed to load tags!")
        })
    }, [])

    return (
        <div className={CSS.contentWr}>
            <div className="card-wrapper">
                <div onClick={()=>{if(slider < 0) setSlider(slider + 1)}} className="card">{"<"}</div>
                <div ref={sliderWr} className={CSS.scrollWr}>
                    <div ref={tagSlider} style={{marginLeft: "calc(" + slider + " * 50%)"}} className={CSS.tagSlider}>
                        <NavLink to={"/"} end className={({isActive})=>{return (isActive? "card active": "card")}}>All</NavLink>
                        <NavLink to={"/followed"} end className={({isActive})=>{return (isActive? "card active": "card")}}>Followed</NavLink>
                        <div className="card active" style={{display: props.mode==="search"? "block": "none"}}>"{keyword}"</div>
                        {
                            tags.map((item)=>
                                <NavLink to={"/tag/"+ item.name} end className={({isActive})=>{return (isActive? "card active": "card")}}>{item.name}</NavLink>
                            )
                        }
                    </div>
                </div>
                <div onClick={()=>{if(tagSlider.current.clientWidth > sliderWr.current.clientWidth * ((-slider + 1) / 2)) setSlider(slider - 1)}} className="card">{">"}</div>
            </div>     
            <Posts setError={props.setError} path={
                props.mode === "date"? "date/" : "" +
                props.mode === "followed"? "followed/" : "" +
                props.mode === "search"? "search/" + keyword + "/" : "" + 
                props.mode === "tag"? "tag/" + keyword + "/" : ""
                }/>
        </div>
    )
}