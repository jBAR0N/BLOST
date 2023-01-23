import CSS from "./story-edit.module.css"
import React, { useState, useRef } from "react"
import trashIcon from "./img/trash.svg"

const Section = ({content, sections, setSections, setChanges, id, changes}) => {
    const [updateOnHold, setUpdateOnHold] = useState(false)
    const contentRef = useRef(content)
    const changesRef = useRef(changes)
    changesRef.current = changes
    contentRef.current = content
    
    const deleteSection = () => {
        setTimeout(()=>{
            setChanges([...changesRef.current, {type: 3, index: sections.indexOf(content)}])
        }, 2000)

        setSections(sections.filter(item=>(
            sections.indexOf(item) !== sections.indexOf(content)
        )))
    }

    const addContent = type => {
        setTimeout(()=>{
            setChanges([...changesRef.current, {type: 3, index: sections.indexOf(content)}, {type: 1, index: sections.indexOf(content), paragraph: {type}}])
        }, 2000)

        setSections(
            sections.map(item=>{
                if (sections.indexOf(item) === sections.indexOf(content)) return({type, text: ""})
                else return item
            })
        )
    }

    const addSection = () => {
        setTimeout(()=>{
            setChanges([...changesRef.current, {type: 1, index: (sections.indexOf(content) + 1), paragraph: {type: 1}}])
        }, 2000)
    }

    const set = (value, object) => {
        setSections(
            sections.map(item=>{
                if (sections.indexOf(item) === sections.indexOf(content)) return({...item, [object]: value})
                else return item
            })
        )

        if (!updateOnHold) {
            setUpdateOnHold(true)
            setTimeout(()=>{
                setUpdateOnHold(false)
                setChanges([...changesRef.current, {type: 2, index: sections.indexOf(content), paragraph: contentRef.current}])
            }, 2000)
        }
    }

    const setImage = e => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        formData.append('id', id)
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        fetch("http://192.168.0.42:3000/set/story/image", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) set(data.file, "text")
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
            {
                content.type === "text"?
                <textarea className="a-input text font-a-text" placeholder="Add text" type="text" value={content.text} onChange={(e)=>{set(e.target.value, "text")}}/>
                :content.type === "image" ?
                <img className="a-image" src={"/image/" + content.text} alt="" />
                :""
            }
        </div>
    )
}

export default Section