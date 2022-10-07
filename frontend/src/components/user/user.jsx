import CSS from "./user.module.css"
import {useParams, Link} from "react-router-dom"
import Posts from "../previews/previews"
import React, { useState, useEffect } from "react"
import Story from "../story/story"
import FourOFour from "../404/404"

const User = ({about}) => {
    const [img, setImg] = useState("/img/user.png")
    const [info, setInfo] = useState({})
    const [followed, setFollowed] = useState(false)
    const [followers, setFollowers] = useState(0)
    const [status, setStatus] = useState("")
    const {name} = useParams()

    useEffect(()=>{
        fetch("http://192.168.0.42:3000/get/user/" + name)
        .then(res => res.json())
        .then(data => {
            if (data.success && data.content.name) {
                setInfo(data.content)
                setFollowers(data.content.followers)
                setStatus("done")
                if (data.content.followed) setFollowed(true)
                else setFollowed(false)
                if(data.content.image)
                fetch("http://192.168.0.42:3000/image/" + data.content.image)
                .then(res => res.blob())
                .then(data => {
                    setImg(URL.createObjectURL(data))
                })
            } else setStatus ("notFound")
        }).catch(()=>{
            setStatus ("notFound")
        })
    }, [name])

    const follow = () => {
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
        status === "done"?
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
                <Link to={"/user/" + name} className={about? "card": "card active"}>Stories {"("}{info.posts}{")"}</Link>
                <Link to={"/user/" + name + "/about"} className={about? "card active": "card"}>About</Link>
            </div>
            {about?
            info.about && <Story about={info.about}/>
            :
            <Posts path={"user/" + name + "/"}/>
            }
        </React.Fragment>
        :status === "notFound" && <FourOFour/>
    )
}

export default User