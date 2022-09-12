import React, {useState, useEffect} from "react"
import Post from "../post/post"
import CSS from "./posts.module.css"

export default function Posts (props) {
    // TODO add loading bar if lastLength !== 0
    // TODO make overflow behavior changable
    const [last, setLast] = useState(0)
    const [length, setLength] = useState(0)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        loadContent();
    }, [])

    function loadContent () {
        const steps = Math.round((window.innerHeight / 140)*2)
        setLoading(true)
        fetch("http://localhost:3000/get/articles/"+ props.path + (last + 1) +"/" + (last + steps))
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setLast(last + steps)
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
        <div onScroll={(e)=>{if (e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 100 && length > 0 && !loading) loadContent()}} className={CSS.content}>
            {props.children}
            {
                articles.map((item)=>(
                    <Post id={item.id} name={item.name} title={item.title} subtitle={item.subtitle} image={item.image} date={item.date} />
                ))
            }
            <div className={CSS.loading}></div>
            <div style={{minHeight: "75px"}}></div>
        </div>
    )
}