import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Draft from "./draft/draft"
import Post from "./post/post"
import CSS from "./posts.module.css"

export default function Posts (props) {
    const navigate = useNavigate()

    const {path} = props
    const [last, setLast] = useState(0)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [finsihed, setFinished] = useState(false)

    useEffect(()=>{
        setLoading(false)
        setLast(0)
        setFinished(false)
        setArticles([])
    }, [path])

    useEffect(()=>{
        if (articles.length === 0 && finsihed === false && loading === false && last === 0) loadContent();
        function handleScroll () {
            if ((window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) && !loading && !finsihed) loadContent()
        }
        window.addEventListener("scroll", handleScroll)
        return ()=>{window.removeEventListener("scroll", handleScroll)}
    })

    function loadContent () {
        const steps = Math.round((window.innerHeight / 140)*2)
        setLoading(true)
        fetch("http://192.168.0.42:3000/get/articles/"+ props.path + (last + 1) +"/" + (last + steps))
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setLast(last + steps)
                setArticles([...articles, ...data.content])
                setLoading(false)
                if(data.content.length < steps) setFinished(true)
            }
            else setFinished(true)
        })
        .catch(()=>{
            setFinished(true)
        })
    }

    return (
        <div className={CSS.content}>
            {props.draft?
                articles.map(item=>(
                    <Draft item={item} public={props.public}/>
                ))
            :
                articles.map(item=>(
                    <Post item={item}/>
                ))
            }
            <div style={{display: finsihed && articles.length === 0? "flex": "none"}} className={CSS.nothing}>
                <p>Looks like there are no stories to read here.</p>
                <div onClick={()=>{navigate("/")}}>Browse content</div>
            </div>
        </div>
    )
}