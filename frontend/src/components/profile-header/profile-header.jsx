import CSS from "./profile-header.module.css"
import addIcon from "./img/add.svg"

export default function ProfileHeader (props) {
    return (
        <div className={CSS.header}>
            <div className={CSS.heading}>{props.title}</div>
            <div className={CSS.writeArticle}>
                <img src={addIcon} alt="add" />
                <p>Create article</p>
            </div>
        </div>
    )
}