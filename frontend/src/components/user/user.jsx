import CSS from "./user.module.css"
import {useNavigate, useParams} from "react-router-dom"
import { useEffect, useState } from "react"
import Posts from "../posts/posts"

export default function User (props) {
    const [credentials, setCredentials] = useState({})
    const {name} = useParams()
    const [notFound, setNotFound] = useState()
    const [img, setImg] = useState("img/user.png")
    const [followed, setFollowed] = useState()
    const [followers, setFollowers] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch("http://localhost:3000/get/user/" + name)
        .then(res => res.json())
        .then(res=> {
            if (res.success && res.content) {
                setNotFound(false)
                setCredentials(res.content);
                setFollowers(res.content.followers)
                setFollowed(res.content.followed)
                if (res.content.image) {
                    fetch("http://localhost:3000/image/" + res.content.image)
                    .then(res => res.blob())
                    .then(data => {
                        setImg(URL.createObjectURL(data))
                    })
                }
            } else setNotFound(true)
        })
        .catch(()=>{setNotFound(true)})
    }, [name])

    function submitFollow () {
        let requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: credentials.name})
        }
        fetch("http://localhost:3000/follow", requestOptions)
        .then(res => res.json())
        .then(data =>{
            if (data.success) {
                setFollowed(data.action)
                if (data.action) {
                    setFollowers(followers + 1)
                } else {
                    setFollowers(followers - 1)
                }
            } else props.setError(data.message)
        })
    }

    return (
        notFound || notFound === undefined?
            <div className={CSS.content}>
                <div className={CSS.notFound}>User not found</div>
                <div onClick={()=>{navigate("/")}} className="call-to-home">Back to home</div>
            </div>
            : 
            <Posts setError={props.setError} path={"user/" + name + "/"} children={
                <div>
                    <div className={CSS.infoRow}>
                        <img className={CSS.img} src={img} alt="account"/>
                        <div className={CSS.name}>{credentials.name}</div>
                        <div style={{marginLeft: "auto"}} className={CSS.infoText}>{credentials.posts }{credentials.posts === 1?" Post":" Posts"}</div>
                        <div className={CSS.infoText}>{followers}{followers === 1?" Follower":" Followers"}</div>
                        {followed?
                            <div onClick={submitFollow} className={CSS.followed + " "+ CSS.followButton}>Unfollow</div>
                            :
                            <div onClick={submitFollow} className={CSS.follow + " "+ CSS.followButton}>Follow</div>
                        }
                    </div>
                    <div className={CSS.description}>{credentials.description}</div>
                </div>
            }/>
    )
}