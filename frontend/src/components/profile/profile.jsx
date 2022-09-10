import CSS from "./profile.module.css"
import { NavLink, Outlet } from "react-router-dom"
import featherIcon from "./img/feather.svg"
import clockIcon from "./img/clock.svg"
import chartIcon from "./img/chart.svg"
import penIcon from "./img/pen.svg"

export default function Profile (props) {

    return (
        <div className={CSS.content}>
            <div className={CSS.infoWr}>
                <img src={props.img} alt="account" className={CSS.accountImg}/>
                <div className={CSS.infoName}>{props.user.username}</div>
                <div className={CSS.infoFollowers}>x follwers</div>
            </div>
            <div className={CSS.nav}>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} end to={"/profile"}><img className={CSS.navIcon} src={featherIcon} alt={"articles"}/></NavLink>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"history"}><img className={CSS.navIcon} src={clockIcon} alt={"history"}/></NavLink>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"stats"}><img className={CSS.navIcon} src={chartIcon} alt={"statitics"}/></NavLink>
                <NavLink className={(({isActive})=>{return (isActive? CSS.link + " " + CSS.active: CSS.link)})} to={"edit"}><img className={CSS.navIcon} src={penIcon} alt={"edit"}/></NavLink>
            </div>
            <Outlet/>
        </div>
    )
}