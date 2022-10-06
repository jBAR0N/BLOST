import React, { useEffect, useState } from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import Nav from "./components/nav/nav";
import Home from './components/home';
import Bookmarks from './components/bookmarks';
import Stories from './components/stories';
import FourOFour from './components/404/404';
import Login from './components/login/login';
import User from './components/user/user';
import Article from './components/article/article';
import EditArticle from './components/article-edit/article-edit';
import Posts from './components/posts/posts';
import Notifications from './components/notifications/notifications';
import Search from './components/search';
import Settings from './components/settings/settings';

function App() {
  const [user, setUser] = useState({loading: true})
  const [img, setImg] = useState("/img/user.png")
  const [unread, setUnread] = useState(false)

  useEffect(()=>{
    fetch("http://192.168.0.42:3000/get/session")
    .then(res => res.json())
    .then(data =>{
      setUser(data)
      if (data.unread) setUnread(true)
      if (data.image)
        fetch("http://192.168.0.42:3000/image/" + data.image)
        .then(res => res.blob())
        .then(data => {setImg(URL.createObjectURL(data))})
      else setImg("/img/user.png")
    }).catch(()=>{
      setUser({})
    })
  }, [])

  return (
    <Routes>
      
      <Route path='/article/edit/:id'element={<EditArticle user={user}/>}/>

      <Route path='/' element={<Nav unread={unread} user={user} img={img}/>}>
        <Route index element={<Home/>}/>
        <Route path='/search/:keyword' element={<Search/>}/>
        <Route path='/user/:name' element={<User/>}/>
        <Route path='/user/:name/about' element={<User about/>}/>
        <Route path='/article/:article' element={<Article/>}/>
        <Route path='/login' element={<Login user={user}/>}/>
        <Route path="*" element={<FourOFour/>}/>
      </Route>

      <Route path='/me' element={<Nav me user={user} img={img}/>}>
        <Route index element={<Navigate to={user.username? "/user/" + user.username: "/"}/>}/>
        <Route path="/me/following" element={<Home following/>}/>
        <Route path="/me/stories" element={<Stories user={user}/>}>
          <Route index element={<Navigate to="/me/stories/drafts" replace/>}/>
          <Route path="/me/stories/drafts" element={<Posts draft path="drafts/"/>}/>
          <Route path="/me/stories/public" element={<Posts draft public path={"user/" + user.username + "/"}/>}/>
        </Route>
        <Route path="/me/list" element={<Bookmarks/>}/>
        <Route path="/me/notifications" element={<Notifications setUnread={setUnread}/>}/>
        <Route path="/me/settings" element={<Settings user={user} img={img}/>}/>
      </Route>

    </Routes>
  );
}

export default App;