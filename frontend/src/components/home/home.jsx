import CSS from "./home.module.css"
import Post from "../post/post"
import React, { useState, useEffect } from "react"

export default function Home (props) {
    // TODO get mode from param
    // TODO make last calculated by height
    // TODO add loading wheel if lastLength is enough
    // TODO dont call fetch several times on scroll
    const [last, setLast] = useState(0)
    const [length, setLength] = useState(10)
    const [articles, setArticles] = useState([])

    useEffect(()=>{
        loadContent()
    }, [])

    function loadContent () {
        fetch("http://localhost:3000/get/articles/date/" + (last + 1) +"/" + (last + 10))
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setLast(last + 10)
                setLength(data.content.length)
                setArticles([...articles, ...data.content])
            }
            else {
                props.setError("Failed to load content!")
            }
        })
        .catch(()=>{
            props.setError("Failed to load content!")
        })
    }

    return (
        <React.Fragment>
            <div className={CSS.tags}></div>
            <div onScroll={(e)=>{if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 100 && length === 10) {loadContent(); console.log("bottom")}}} className={CSS.content}>
                {
                    articles.map((item)=>(
                        <Post id={item.id} name={item.name} title={item.title} subtitle={item.subtitle} date={item.date} />
                    ))
                }
            </div>
        </React.Fragment>
    )
}