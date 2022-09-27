import CSS from "./user.module.css"
import {useParams, Link} from "react-router-dom"
import Posts from "../posts/posts"
import React, { useState, useEffect } from "react"

export default function User (props) {
    const [img, setImg] = useState("/img/user.png")
    const [info, setInfo] = useState({})
    const [followed, setFollowed] = useState(false)
    const [followers, setFollowers] = useState(0)
    const {name} = useParams()

    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/user/" + name)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setInfo(data.content)
                setFollowers(data.content.followers)
                if (data.content.followed) setFollowed(true)
                else setFollowed(false)
                if(data.content.image)
                fetch("http://192.168.0.42:3000/image/" + data.content.image)
                .then(res => res.blob())
                .then(data => {
                    setImg(URL.createObjectURL(data))
                })
            }
        })
    }, [name])

    function follow () {
        const original = followed
        const originalCount = followers
        if (followed) setFollowers(followers - 1)
        else setFollowers(followers + 1)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: info.name})
        }
        setFollowed(!followed)
        fetch("http://192.168.0.42:3000/follow", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) setFollowed(data.action)
            else {
                setFollowed(original)
                setFollowers(originalCount)
            }
        }).catch(()=>{
            setFollowed(original)
            setFollowers(originalCount)
        })
    }

    return (
        <React.Fragment>
            <div className={CSS.header}>
                <img className={CSS.headerImg} src={img} alt="" />
                <div className={CSS.headerInfoWr}>
                    <div className={CSS.headerName}>{info.name}</div>
                    <div className={CSS.headerFollower}>{followers}{followers === 1? " Follower": " Followers"}</div>
                </div>
                <div onClick={follow} className={CSS.follow + " " + (followed? CSS.unfollow :"")}>{followed? "Unfollow": "Follow"}</div>
            </div>
            <div className="card-wrapper">
                <Link to={"/user/" + name} className={props.about? "card": "card active"}>Stories {"("}{info.posts}{")"}</Link>
                <Link to={"/user/" + name + "/about"} className={props.about? "card active": "card"}>About</Link>
            </div>
            {props.about? "":
            <Posts path={"user/" + name + "/"}/>
            }
        </React.Fragment>
    )
}