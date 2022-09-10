import CSS from "./post.module.css"
import bookmarkIcon from "./img/bookmark.svg"
import { useNavigate } from "react-router-dom"

export default function Post (props) {
    const navigate = useNavigate()
    return(
        <div onClick={()=>{navigate("/article/" + props.title)}} className={CSS.content}>
            <div className={CSS.row}>
                <div className={CSS.heading}>{props.title}</div>
                <img onClick={(e)=>{e.stopPropagation();}} className={CSS.bookmark} src={bookmarkIcon} alt={"bookmark"} />
            </div>
            <div className={CSS.description}>{props.description}</div>
            <div className={CSS.row}>
                <div className={CSS.info}>{props.time} ago</div>
                <div onClick={(e)=>{e.stopPropagation(); navigate("/user/" + props.writer)}} className={CSS.writerWr}>
                    <div className={CSS.writer}>{props.writer}</div>
                    <div className={CSS.imgWr}></div>
                </div>
            </div>
        </div>
    )
}