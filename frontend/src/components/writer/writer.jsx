import CSS from "./writer.module.css"
import {useNavigate} from "react-router-dom"

export default function User (props) {
    const navigate = useNavigate()

    function redirect () {
        navigate("/user/" + props.name)
    }

    return (
        <div onClick={redirect} className={CSS.user}>
            <div className={CSS.imgWr}></div>
            <div className={CSS.name}>{props.name}</div>
        </div>
    )
}