import CSS from "./article-edit.module.css"
import React from "react"
import trashIcon from "./img/trash.svg"
import { useState, useEffect } from "react"

export default function Section (props) {
    const [img, setImg] = useState("/img/placeholder.jpg")
    const {content} = props

    useEffect(()=>{
        if (props.content.type === "image") {
            if (props.content.content)
            fetch("http://192.168.0.42:3000/image/" + props.content.content)
            .then(res => res.blob())
            .then(data => {
                setImg(URL.createObjectURL(data))
            }).catch(()=>{
                setImg("/img/placeholder.jpg")
            })
            else setImg("/img/placeholder.jpg")
        }
    }, [content])

    function deleteSection () {
        props.setSections(props.sections.filter(item=>(
            props.sections.indexOf(item) !== props.sections.indexOf(props.content)
        )))
    }

    function set(value, object) {
        props.setSections(
            props.sections.map(item=>{
                if (props.sections.indexOf(item) === props.sections.indexOf(props.content)) return({...item, content: object === "type"?null:item.content , [object]: value})
                else return item
            })
        )
    }

    function setImage (e) {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        formData.append('id', props.id)
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        fetch("http://192.168.0.42:3000/set/article/image", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) set(data.file, "content")
        })
    }

    return (
        <div className={CSS.section}>
            <div className={CSS.row}>
                <select onChange={(e)=>{set(e.target.value, "type")}} value={props.content.type} className={CSS.typeSelect}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
                <label style={{display: props.content.type === "image"? "block": "none"}} className={CSS.fileLabel}>
                    Choose file
                    <input onChange={setImage} type="file" accept="image/png, image/jpg"/>
                </label>
                <img onClick={deleteSection} className={CSS.deleteSection} src={trashIcon} alt="delete" />
            </div>
            <textarea className="a-input subtitle font-a-subtitle" placeholder="Add title (optional)" type="text" value={props.content.title} onChange={(e)=>{set(e.target.value, "title")}}/>
            {
                props.content.type === "text"?
                <textarea className="a-input text font-a-text" placeholder="Add text" type="text" value={props.content.content} onChange={(e)=>{set(e.target.value, "content")}}/>
                :props.content.type === "image" ?
                <img className="a-image" src={img} alt="" />
                :""
            }
        </div>
    )
}