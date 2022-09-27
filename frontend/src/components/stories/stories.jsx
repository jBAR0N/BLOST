import CSS from "./stories.module.css"
import { NavLink, Outlet} from "react-router-dom"

export default function Stories (props) {
    return (
        <div className={CSS.content}>
            <div className="page-heading-wrapper">
                <div className="page-heading">Your stories</div>
                <div className="page-heading-cta">Write a story</div>
            </div>
            <div className="card-wrapper">
                <NavLink className={({isActive})=>{return isActive? "card active": "card"}} to={"/me/stories/drafts"}>Drafts {"("}{/*count*/}{")"}</NavLink>
                <NavLink className={({isActive})=>{return isActive? "card active": "card"}} to={"/me/stories/public"}>Published {"("}{/*count*/}{")"}</NavLink>
            </div>
            <Outlet/>
        </div>
    )
}