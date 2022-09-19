import CSS from "./followed.module.css"
import Writer from "../writer/writer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import Posts from "../posts/posts"
import searchIcon from "./img/search.svg"

export default function Followed (props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
        if (props.user.email && !props.user.loading && !props.user.username) navigate("/profile/new", {replace: true})
    }, [props])
    
    return (
        props.user.username?
        <Posts setError={props.setError} path={"followed/"} children={
            <Writers setError={props.setError}/>
        }/>
        :""
    )
}

function Writers (props) {
    const navigate = useNavigate()
    const userSlider = useRef()
    const sliderWr = useRef()
    const [slider, setSlider] = useState(0)
    const [writers, setWriters] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/get/followed")
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setWriters(data.content)
            } else {
                props.setError("Failed to load writers!")
            }
        })
        .catch(()=>{
            props.setError("Failed to load writers!")
        })
    }, [])

    return (
        <div className={CSS.content}>
        <div className={CSS.heading}>Writers</div>
        <div className={CSS.writers}>
            <div onClick={()=>{if(slider < 0) setSlider(slider + 1)}} className={CSS.moveSlider}>{"<"}</div>
            <div style={{justifyContent: writers.length === 0? "center": ""}} ref={sliderWr} className={CSS.sliderWr}>
                <div style={{display: writers.length === 0? "flex": "none"}} className={CSS.noUserWr}>
                    <img src={searchIcon} alt="nothing found" className={CSS.searchImg}/>
                    You haven't followed anyone!
                    <div className={CSS.cta} onClick={()=>{navigate("/")}}>Browse content</div>
                </div>
                <div style={{marginLeft: "calc(" + slider + " * 50%)"}} ref={userSlider} className={CSS.slider}>
                {writers.map((item)=>
                    <Writer name={item.name} image={item.image}/>
                )}
                </div>
            </div>
            <div onClick={()=>{if(userSlider.current.clientWidth > sliderWr.current.clientWidth * ((-slider + 1) / 2)) setSlider(slider - 1)}} className={CSS.moveSlider}>{">"}</div>
        </div>
        <div className={CSS.heading}>Posts</div>
        </div>
    )
}