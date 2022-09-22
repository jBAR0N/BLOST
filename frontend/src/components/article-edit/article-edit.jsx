import CSS from "./article-edit.module.css"
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import trashIcon from "./img/trash.svg"

export default function EditArticle () {
    const {id} = useParams()
    const [sections, setSections] = useState([])
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")

    function addSection () {
        setSections([...sections, {type: "text"}])
    }

    function save () {
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
        fetch("http://localhost:3000/set/article", requestOptions)
        .then(res => res.json())
        .then(data => {

        })
    }

    return (
        <div className={CSS.wrapper}>
            <div className={CSS.header}>
                <div style={{marginLeft: "auto"}} onClick={save} className={CSS.publish}>Save</div>
                <div className={CSS.publish}>Publish</div>
            </div>
            <div className={CSS.main}>
                <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder="Add title" className={CSS.title}/>
                <textarea onChange={(e)=>{setSubtitle(e.target.value)}} value={subtitle} type="text" placeholder="Add description" className={CSS.subtitle}/>
                <div className={CSS.sections}>
                    {
                        sections.map((item)=>(
                            <Section setSections={setSections} sections={sections} content={item} index={sections.indexOf(item)}/>
                        ))
                    }
                </div>
                <div onClick={addSection} className={CSS.addSection}>Add section</div>
            </div>
        </div>
    )
}

function Section (props) {

    function deleteSection () {
        props.setSections(props.sections.filter(item=>(
            props.sections.indexOf(item) !== props.index
        )))
    }

    function set(e, object) {
        props.setSections(
            props.sections.map(item=>{
                if (props.sections.indexOf(item) === props.index) return({...item, [object]: e.target.value})
                else return item
            })
        )
    }

    return (
        <div className={CSS.section}>
            <div className={CSS.row}>
                <select onChange={(e)=>{set(e, "type")}} value={props.content.type} className={CSS.typeSelect}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="iframe">iframe</option>
                </select>
                <img onClick={deleteSection} className={CSS.deleteSection} src={trashIcon} alt="delete" />
            </div>
            {
                props.content.type === "text"?
                <div>
                    <input className={CSS.sectionTitle} placeholder="Add title (optional)" type="text" value={props.content.title} onChange={(e)=>{set(e, "title")}}/>
                    <textarea className={CSS.textInput} placeholder="Add text" type="text" value={props.content.content} onChange={(e)=>{set(e, "content")}}/>
                </div>
                :""
            }
        </div>
    )
}