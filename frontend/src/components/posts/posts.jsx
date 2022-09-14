import React, {useState, useEffect} from "react"
import Post from "../post/post"
import CSS from "./posts.module.css"

export default function Posts (props) {
    // TODO add text for nothing to find
    const [last, setLast] = useState(0)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [finsihed, setFinished] = useState(false)

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
                setArticles([...articles, ...data.content])
                setLoading(false)
                if(data.content.length < steps) setFinished(true)
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
        <div onScroll={(e)=>{if (e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 100 && !finsihed && !loading) loadContent()}} className={CSS.content}>
            {props.children}
            {
                articles.map((item)=>(
                    <Post id={item.id} name={item.name} title={item.title} subtitle={item.subtitle} image={item.image} date={item.date} />
                ))
            }
            <div style={{display: !finsihed? "flex": "none"}} className={CSS.loadingWr}>
                <div className={CSS.bar}>
                    <div className={CSS.loading}/>
                </div>
            </div>
            <div style={{minHeight: "100px"}}></div>
        </div>
    )
}