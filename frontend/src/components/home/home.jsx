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

    return (
        <React.Fragment>
            <div className="page-heading-wrapper">
                <div className="page-heading">Your feed</div>
            </div>
            <div className="card-wrapper">
                <div ref={sliderWr} className={CSS.scrollWr}>
                    <div ref={tagSlider} style={{marginLeft: "calc(" + slider + " * 50%)"}} className={CSS.tagSlider}>
                        <NavLink to={"/"} end className={({isActive})=>{return (isActive? "card active": "card")}}>For you</NavLink>
                        <NavLink to={"/followed"} end className={({isActive})=>{return (isActive? "card active": "card")}}>Followed</NavLink>
                    </div>
                </div>
            </div>     
            <Posts setError={props.setError} path={
                props.mode === "date"? "date/" : "" +
                props.mode === "followed"? "followed/" : "" +
                props.mode === "search"? "search/" + keyword + "/" :""
                }/>
        </React.Fragment>
    )
}