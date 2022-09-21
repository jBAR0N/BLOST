import CSS from "./404.module.css"
import {Link} from "react-router-dom"

export default function FourOFour () {
    return (
        <div className="centered-content-wrapper">
            <p className={CSS.code}>404</p>
            <p className={CSS.text}>Page not found</p>
            <Link className="call-to-home" to="/">Back to home</Link>
        </div>
    )
}