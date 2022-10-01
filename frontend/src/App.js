import React, { useEffect, useState } from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import Nav from "./components/nav/nav";
import Home from './components/home';
import Bookmarks from './components/bookmarks';
import Stories from './components/stories/stories';
import FourOFour from './components/404/404';
import Login from './components/login/login';
import User from './components/user/user';
import Article from './components/article/article';
import EditArticle from './components/article-edit/article-edit';
import Posts from './components/posts/posts';
import Notifications from './components/notifications/notifications';

function App() {
  const [user, setUser] = useState({loading: true})
  const [img, setImg] = useState("/img/user.png")
  const [unread, setUnread] = useState(false)

  useEffect(()=>{
    fetch("http://192.168.0.42:3000/get/session")
    .then(res => res.json())
    .then(res =>{
      setUser(res)
      if (res.unread) setUnread(true)
      if (res.image)
        fetch("http://192.168.0.42:3000/image/" + res.image)
        .then(res => res.blob())
        .then(data => {setImg(URL.createObjectURL(data))})
      else setImg("/img/user.png")
    })
    .catch(()=>{
      setUser({})
    })
  }, [])

  return (
    <Routes>
      
      <Route path='/article/edit/:id'element={<EditArticle user={user}/>}/>

      <Route path='/' element={<Nav unread={unread} img={img} user={user}/>}>
        <Route index element={<Home user={user}/>}/>
        <Route path='/user/:name' element={<User/>}/>
        <Route path='/user/:name/about' element={<User about/>}/>
        <Route path='/article/:article' element={<Article/>}/>
        <Route path='/login' element={<Login user={user}/>}/>
        <Route path="*" element={<FourOFour/>}/>
      </Route>

      <Route path='/me' element={<Nav me img={img} user={user}/>}>
        <Route path="/me/following" element={<Home following/>}/>
        <Route path="/me/stories" element={<Stories user={user}/>}>
          <Route index element={<Navigate to="/me/stories/drafts" replace/>}/>
          <Route path="/me/stories/drafts" element={<Posts draft path={"drafts/"}/>}/>
          <Route path="/me/stories/public" element={<Posts draft public path={"user/" + user.username + "/"}/>}/>
        </Route>
        <Route path="/me/list" element={<Bookmarks/>}/>
        <Route path="/me/notifications" element={<Notifications setUnread={setUnread}/>}/>
      </Route>

    </Routes>
  );
}

export default App;