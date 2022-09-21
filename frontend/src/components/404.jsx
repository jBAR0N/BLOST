import {Link} from "react-router-dom"

export default function FourOFour () {
    return (
        <div className="centered-content-wrapper">
            <p className="error-page-code">404</p>
            <p className="error-page-text">Page not found</p>
            <Link className="call-to-home" to="/">Back to home</Link>
        </div>
    )
}