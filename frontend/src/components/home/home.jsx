import CSS from "./home.module.css"
import Posts from "../posts/posts"
import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"

export default function Home (props) {
    const {keyword} = useParams()

    return (
        <div className={CSS.contentWr}>
            <div className={CSS.tags}>
            </div>    
            <Posts setError={props.setError} path={
                props.mode === "date"? "date/" : "" +
                props.mode === "search"? "search/" + keyword + "/" : "" + 
                props.mode === "tag"? "tag/" + keyword + "/" : ""
                }/>
        </div>
    )
}