import CSS from "./followed.module.css"
import Writer from "../writer/writer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import Posts from "../posts/posts"

export default function Followed (props) {
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

    useEffect(()=>{
        if (!props.user.email && !props.user.loading) navigate("/login", {replace: true})
    }, [props])
    
    return (
        props.user.email?
        <Posts setError={props.setError} path={"followed/"} children={
            <div className={CSS.content}>
                <div className={CSS.heading}>Writers</div>
                <div className={CSS.writers}>
                    <div onClick={()=>{if(slider < 0) setSlider(slider + 1)}} className={CSS.moveSlider}>{"<"}</div>
                    <div ref={sliderWr} className={CSS.sliderWr}>
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
        }/>
        :""
    )
}