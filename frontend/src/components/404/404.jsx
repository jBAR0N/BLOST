import CSS from "./404.module.css"
import {Link} from "react-router-dom"

export default function FourOFour () {
    return (
        <div className={CSS.content}>
            <p>404</p>
            <p>Page not found</p>
            <Link className="call-to-home" to="/">Back to home</Link>
        </div>
    )
}