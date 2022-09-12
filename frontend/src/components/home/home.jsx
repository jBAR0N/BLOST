import CSS from "./home.module.css"
import Post from "../post/post"
import React, { useState, useEffect } from "react"

export default function Home (props) {
    // TODO get mode from props
    // TODO add loading wheel if lastLength !== 0
    const [last, setLast] = useState(0)
    const [length, setLength] = useState(0)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        loadContent();
    }, [])

    function loadContent () {
        setLoading(true)
        fetch("http://localhost:3000/get/articles/date/" + (last + 1) +"/" + (last + Math.round(window.innerHeight / 140)*2))
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setLast(last + Math.round(window.innerHeight / 140)*2)
                setLength(data.content.length)
                setArticles([...articles, ...data.content])
                setLoading(false)
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
            <div onScroll={(e)=>{if (e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 100 && length > 0 && !loading) loadContent()}} className={CSS.content}>
                {
                    articles.map((item)=>(
                        <Post id={item.id} name={item.name} title={item.title} subtitle={item.subtitle} image={item.image} date={item.date} />
                    ))
                }
                <div className={CSS.loading}></div>
                <div style={{minHeight: "75px"}}></div>
            </div>
        </React.Fragment>
    )
}