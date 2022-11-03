import CSS from "./story-edit.module.css"
import { useNavigate, useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import Section from "./section"
import arrowIcon from "./img/arrow.svg"

const StoryEdit = ({user: {username}}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [roll, setRoll] = useState("draft")
    const [sections, setSections] = useState([])
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [changes, setChanges] = useState([])


    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/draft/" + id, {method: "POST"})
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setTitle(data.title)
                setSections(data.content)
                setSubtitle(data.subtitle)
                setRoll(data.roll)
                setLoading(false)
            } else navigate("/", {replace: true})
        }).catch(()=>{
            navigate("/", {replace: true})
        })
    }, [id, navigate])

    const addSection = () => { setSections([...sections, {type: "text", content: "", title: ""}]) }

    const save = callback => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ title, subtitle, sections, id })
        }
        fetch("http://192.168.0.42:3000/set/story", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) return callback()
        })
    }

    const publish = () => {
        save(()=>{
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: id})
            }
            if ((title && subtitle && sections.length) || roll === "about")
            fetch("http://192.168.0.42:3000/set/story/public", requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.success) navigate("/story/" + id, {replace: true})
            })
        })
    }

    return (
        !loading?
        <React.Fragment>
            <div className={CSS.header}>
                {roll !== "about" &&<img alt="back" onClick={()=>{save(()=>{navigate("/me/stories/drafts")})}} src={arrowIcon} className={CSS.back}/>}
                <div className={CSS.headerInfo}>{roll === "about"? "About ":"Draft in "}{username}</div>
                {roll === "about" ? 
                <div onClick={()=>{save(()=>{navigate("/me/settings")})}} className={CSS.publish}>Save</div>
                :<div onClick={publish} className={CSS.publish}>Publish</div>}
            </div>
            <div className={CSS.main}>
                <textarea onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder="Add title" className="a-input title font-a-title"/>
                <textarea onChange={(e)=>{setSubtitle(e.target.value)}} value={subtitle} type="text" placeholder="Add description" className="a-input description font-a-text"/>
                {
                    sections.map((item)=>(
                        <Section id={id} setSections={setSections} sections={sections} content={item}/>
                    ))
                }
                <div onClick={addSection} className={CSS.addSection}>Add section</div>
            </div>
        </React.Fragment>
        :
        <div className="centered-content-wrapper">
            <div className={CSS.loading}>Loading...</div>
        </div>
    )
}

export default StoryEdit