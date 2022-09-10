import CSS from "./home.module.css"
import Post from "../post/post"

export default function Home (props) {
    return (
        <div className={CSS.content}>
            <Post 
                time="2 days"
                bookmarked={false} 
                description="This blog explains the basic of the javascript frontend framework React made by Facebook" 
                title="Getting started with React"
                writer="Lars Gutgesell"
                image=""
            />
        </div>
    )
}