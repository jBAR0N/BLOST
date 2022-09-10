import CSS from "./error.module.css"
import xIcon from "./img/x.svg"
import errorIcon from "./img/error.svg"
import { useEffect } from "react"

export default function Error (props) {
    useEffect(()=>{
        if (props.error) {
            setTimeout(()=>{props.setError("")}, 3000)
        }
    }, [props])

    return (
        <div className={CSS.content}>
            <div style={{height: props.error? "30px": "0px"}} className={CSS.error}>
                <img src={errorIcon} alt="error" className={CSS.errorIcon}/> {props.error}
                <img onClick={()=>{props.setError(null)}} className={CSS.close} src={xIcon} alt={"close"} />
            </div>
        </div>
    )
}