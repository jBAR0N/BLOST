import React from "react"
import { Link } from "react-router-dom"
import CSS from "./logincall.module.css"

export default function LoginCall (props) {
    return (
        <div className={CSS.content}>
            {props.user.email === undefined? 
            <React.Fragment>
                <p>Not logged in</p>
                <Link to="/login">Sign in</Link>
            </React.Fragment>: 
            <React.Fragment>
                <p>Almost done!</p>
                <Link to="/newUser">Finish account setup...</Link>
            </React.Fragment>
            }
        </div>
    )
}