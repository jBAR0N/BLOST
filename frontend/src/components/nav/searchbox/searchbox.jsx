import CSS from "./searchbox.module.css"
import arrowIcon from "./img/arrow.svg"

export default function SearchBox (props) {
    return (
        <div style={{display: props.search? "block":"none" }} onClick={(e)=>{e.stopPropagation()}} className={CSS.content}>
            <input placeholder="Search" type="text" className={CSS.input}/>
            <img className={CSS.icon} src={arrowIcon}/>
        </div>
    )
}