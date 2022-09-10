import CSS from "./followed.module.css"
import Writer from "../writer/writer"

export default function Followed (props) {
    
    return (
        <div className={CSS.content}>
            <div className={CSS.heading}>Writers</div>
            <div className={CSS.writers}>
                <Writer name="hello there"/>
                <Writer name="hello there"/>
                <Writer name="hello there"/>
            </div>
            <div className={CSS.heading}>Posts</div>
        </div>
    )
}