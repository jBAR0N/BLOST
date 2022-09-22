import CSS from "./profile-header.module.css"
import addIcon from "./img/add.svg"
import { useNavigate } from "react-router-dom"

export default function ProfileHeader (props) {
    const navigate = useNavigate()

    return (
        <div className={CSS.header}>
            <div className={CSS.heading}>{props.title}</div>
            <div className={CSS.writeArticle} onClick={()=>{navigate("/article/create/new")}}>
                <img src={addIcon} alt="add" />
                <p>Create article</p>
            </div>
        </div>
    )
}