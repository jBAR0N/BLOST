import CSS from "./404.module.css"
import {Link} from "react-router-dom"
import React from "react"

const FourOFour = () => (
    <div className="centered-content-wrapper">
        <div className={CSS.margin}></div>
        <div className="page-heading">404: Not found</div>
        <div className={CSS.infoText}>Looks like the page you're looking for doesn't exist. Maybe a story or an user was deleted or we've changed something on our site.</div>
        <Link to="/" className="page-heading-cta">Browse content</Link>
    </div>
)

export default FourOFour