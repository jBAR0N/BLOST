import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CSS from "./settings.module.css"

export default function Settings ({user, img}) {
    return (
        <div className={CSS.content}>
            <div className={CSS.title}>About you</div>
            <InputSection path="name" title="Name" field={user.username} 
            description="Your name appears on your Profile page and as your byline and domain. It is a required field. Max 50 characters."
            />
            <ImageSection img={img}/>
            <AboutSection story={user.about}/>
            <div className={CSS.title}>Security</div>
            <InputSection path="email" title="Email" field={user.email} 
            description="Your email is used for signing in and sending notifications to you. It won't appear publicly."
            />
            <PasswordSection />
            <DeleteSection />
        </div>
    )
}

function AboutSection ({story}) {
    return (
        <div className={CSS.inputSection}>
            <div className={CSS.inputMain}>
                <div className={CSS.inputTitle}>About page</div>
                <div className={CSS.inputDescription}>This is a story, that appears in the about tab on your Profile page.</div>
            </div>
            <Link className={CSS.inputButton} to={"/article/edit/" + story}>Edit</Link>
        </div>
    )
}

function ImageSection ({img}) {
    function submit (e) {
        var data = new FormData()
        data.append("image", e.target.files[0])
        const requestOptions = {
            method: "POST",
            body: data
        }
        fetch("http://192.168.0.42:3000/set/image", requestOptions)
        .then(res => res.json())
        .then(data => {
            if (data.success) document.location.reload()
        })
    }

    return (
        <div className={CSS.inputSection}>
            <div className={CSS.mainImgWr}>
                <div className={CSS.inputMain}>
                    <div className={CSS.inputTitle}>Photo</div>
                    <div className={CSS.inputDescription}>Your photo appears on your Profile page and with your stories. Recommended ratio: Square. </div>
                </div>
                <img alt="" src={img} className={CSS.image}></img>
            </div>
            <label>
                <input type="file" onChange={submit} />
                <div className={CSS.inputButton}>Edit</div>
            </label>
        </div>
    )
}

function PasswordSection () {
    const [current, setCurrent] = useState("")
    const [newP, setNewP] = useState("")
    const [rNewP, setRNewP] = useState("")

    function submit () {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({new: newP, old: current})
        }
        if (newP && newP === rNewP && current)
        fetch("http://192.168.0.42:3000/set/password", requestOptions)
        .then(res=>res.json())
        .then(data=>{
            if (data.success) document.location.reload();
        })
    }

    return (
        <div className={CSS.inputSection}>
            <div className={CSS.inputMain}>
                <div className={CSS.inputTitle}>Change password</div>
                <input type="password" onChange={e=>{setCurrent(e.target.value)}} value={current} placeholder="Current password" className={CSS.inputInput}/>
                <input type="password" onChange={e=>{setNewP(e.target.value)}} value={newP} placeholder="New password" className={CSS.inputInput}/>
                <input type="password" onChange={e=>{setRNewP(e.target.value)}} value={rNewP} placeholder="Repeat new password" className={CSS.inputInput}/>
                <div className={CSS.inputDescription}>Please remember you're new password and chose one, that is strong. A strong password should contain upper case and lower case characters as well as nubmers and special characters.</div>
            </div>
            <div className={CSS.inputControl}>
                <div/>
                <div onClick={submit} className={CSS.inputButton}>Submit</div>
            </div>
        </div>
    )
}

function DeleteSection () {
    const [input, setInput] = useState("")

    function submit () {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password: input})
        }
        if (input)
        fetch("http://192.168.0.42:3000/delete/profile", requestOptions)
        .then(res=>res.json())
        .then(data=>{
            if (data.success) document.location = "/";
        })
    }

    return (
        <div className={CSS.inputSection}>
            <div className={CSS.inputMain}>
                <div className={CSS.inputTitle}>Delete account</div>
                <input onChange={(e)=>{setInput(e.target.value)}} value={input} placeholder="Password" className={CSS.inputInput}/>
                <div className={CSS.inputDescription}>Deleting your account will permanently delete all content and other data you've created.</div>
            </div>
            <div onClick={submit} className={CSS.inputButton}>Delete</div>
        </div>
    )
}

function InputSection ({title, description, field, path}) {
    const [input, setInput] = useState("")
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        setInput(field)
    }, [edit, field])

    function submit () {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({object: input})
        }
        if (input)
        fetch("http://192.168.0.42:3000/set/" + path, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            if (data.success) document.location.reload();
        })
    }

    return (
        <div className={CSS.inputSection}>
            <div className={CSS.inputMain}>
                <div className={CSS.inputTitle}>{title}</div>
                {edit?
                    <textarea onChange={(e)=>{setInput(e.target.value)}} value={input} placeholder="" className={CSS.inputInput}/>
                :
                    <div className={CSS.inputInput}>{field}</div>
                }
                <div className={CSS.inputDescription}>{description}</div>
            </div>
            <div className={CSS.inputControl}>
                {edit ? <div onClick={submit} className={CSS.inputButton}>Save</div>: <div/>}
                <div onClick={()=>{setEdit(!edit)}} className={CSS.inputButton}>{edit? "Cancel": "Edit"}</div>
            </div>
        </div>
    )
}