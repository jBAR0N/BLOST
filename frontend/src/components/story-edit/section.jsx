import CSS from "./story-edit.module.css"
import React from "react"
import trashIcon from "./img/trash.svg"
import { useState, useEffect } from "react"

const Section = ({content, sections, setSections, id}) => {
    const [img, setImg] = useState("/img/placeholder.jpg")

    useEffect(()=>{
        if (content.type === "image") {
            if (content.content)
            fetch("http://192.168.0.42:3000/image/" + content.content)
            .then(res => res.blob())
            .then(data => {
                setImg(URL.createObjectURL(data))
            }).catch(()=>{
                setImg("/img/placeholder.jpg")
            })
            else setImg("/img/placeholder.jpg")
        }
    }, [content])

    const deleteSection = () => {
        setSections(sections.filter(item=>(
            sections.indexOf(item) !== sections.indexOf(content)
        )))
    }

    const set = (value, object) => {
        setSections(
            sections.map(item=>{
                if (sections.indexOf(item) === sections.indexOf(content)) return({...item, content: object === "type"? null : item.content , [object]: value})
                else return item
            })
        )
    }

    const setImage = e => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        formData.append('id', id)
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
                <select onChange={(e)=>{set(e.target.value, "type")}} value={content.type} className={CSS.typeSelect}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
                {content.type === "image" && 
                    <label className={CSS.fileLabel}>
                        Choose file
                        <input onChange={setImage} type="file" accept="image/png, image/jpg"/>
                    </label>
                }
                <img onClick={deleteSection} className={CSS.deleteSection} src={trashIcon} alt="delete" />
            </div>
            <textarea className="a-input subtitle font-a-subtitle" placeholder="Add title (optional)" type="text" value={content.title} onChange={(e)=>{set(e.target.value, "title")}}/>
            {
                content.type === "text"?
                <textarea className="a-input text font-a-text" placeholder="Add text" type="text" value={content.content} onChange={(e)=>{set(e.target.value, "content")}}/>
                :content.type === "image" ?
                <img className="a-image" src={img} alt="" />
                :""
            }
        </div>
    )
}

export default Section