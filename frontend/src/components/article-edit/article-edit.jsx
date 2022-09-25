import CSS from "./article-edit.module.css"
import { useNavigate, useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import Section from "./section"
import saveIcon from "./img/save.svg"
import publishIcon from "./img/publish.svg"
import gearIcon from "./img/gear.svg"
import checkIcon from "./img/check.svg"

export default function EditArticle () {
    const navigate = useNavigate()
    const {id} = useParams()
    const [sections, setSections] = useState([])
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [saved, setSaved] = useState(true)

    useEffect(()=>{
        setSaved(false)
    }, [subtitle, title, sections])

    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/draft/" + id)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setTitle(data.title)
                setSections(data.content)
                setSubtitle(data.subtitle)
                setLoading(false)
            } else navigate("/", {replace: true})
        }).catch(()=>{
            navigate("/", {replace: true})
        })
    }, [])

    function addSection () {
        setSections([...sections, {type: "text", content: "", title: ""}])
    }

    function save (callback) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                subtitle: subtitle,
                sections: sections,
                id: id
            })
        }
        fetch("http://192.168.0.42:3000/set/article", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) return callback()
        })
    }

    return (
        !loading?
        <div className={CSS.wrapper}>
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
            <div className={CSS.nav}>
                <NavItem text="Done" icon={checkIcon} event={()=>{save(()=>{navigate("/profile")})}}/>
                <NavItem text={saved?"Saved":"Save"} icon={saveIcon} event={()=>{if(!saved)save(()=>{setSaved(true)})}}/>
                <NavItem text="Settings" icon={gearIcon} event={()=>{save(()=>{navigate("/article/settings/" + id)})}}/>
                <NavItem text="Publication" icon={publishIcon} event={()=>{save(()=>{navigate("/article/publication/" + id)})}}/>
            </div>
        </div>
        :
        <div className="centered-content-wrapper">
            <div className={CSS.loading}>Loading...</div>
        </div>
    )
}

const NavItem = (props) => (
    <div onClick={props.event} className={CSS.navButton}>
        <img src={props.icon} alt="" />
        <p>{props.text}</p>
    </div>
)