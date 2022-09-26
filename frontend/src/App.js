import React, { useEffect, useState } from 'react';
import {Route, Routes} from "react-router-dom";
import Nav from "./components/nav/nav";
import Home from './components/home/home';
import Bookmarks from './components/bookmarks';
import Stories from './components/stories/stories';
import FourOFour from './components/404/404';
import UserPosts from './components/profile-published';
import UserDrafts from './components/profile-drafts';
import Login from './components/login/login';
import NewUser from './components/newuser/newuser';
import User from './components/user/user';
import Article from './components/article/article';
import EditArticle from './components/article-edit/article-edit';
import PublishArticle from './components/article-publish/article-publish';

function App() {
  const [user, setUser] = useState({loading: true})
  const [img, setImg] = useState("/img/user.png")

  useEffect(()=>{
    fetch("http://192.168.0.42:3000/get/session")
    .then(res => res.json())
    .then(res =>{
      setUser(res)
      if (res.image) {
        fetch("http://192.168.0.42:3000/image/" + res.image)
        .then(res => res.blob())
        .then(data => {setImg(URL.createObjectURL(data))})
      } else {
        setImg("/img/user.png")
      }
    })
    .catch(()=>{
      setUser({})
    })
  }, [])

  return (
      <Routes>
        <Route path='/article/publication/:id'element={<PublishArticle/>}/>
        <Route path='/article/settings/:id'element={<PublishArticle/>}/>
        <Route path='/article/edit/:id'element={<EditArticle/>}/>
        <Route path='/profile/new' element={<NewUser user={user} img={img}/>}/>
        <Route path='/login' element={<Login user={user}/>}/>
        <Route path='/' element={<Nav img={img} user={user}/>}>
          <Route index element={<Home mode="date" user={user}/>}/>
          <Route path='/search/:keyword' element={<Home mode="search" user={user}/>}/>
          <Route path="/followed" element={<Home mode="followed" user={user}/>}/>
          <Route path="/bookmarks" element={<Bookmarks user={user}/>}/>
          <Route path="/stories" element={<Stories img={img} user={user}/>}>
            <Route path="/stories" element={<UserDrafts user={user}/>}/>
            <Route path="/stories/published" element={<UserPosts user={user}/>}/>
          </Route>
          <Route path='/user/:name' element={<User/>}/>
          <Route path='/article/:article' element={<Article/>}/>
          <Route path="*" element={<FourOFour/>}/>
        </Route>
      </Routes>
  );
}

export default App;