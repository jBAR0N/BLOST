import React, { useEffect, useState } from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import Nav from "./components/nav/nav";
import Home from './components/home';
import Bookmarks from './components/bookmarks';
import Stories from './components/stories';
import FourOFour from './components/404/404';
import Login from './components/login/login';
import User from './components/user/user';
import Story from './components/story/story';
import StoryEdit from './components/story-edit/story-edit';
import Posts from './components/previews/previews';
import Notifications from './components/notifications/notifications';
import Search from './components/search';
import Settings from './components/settings/settings';

const App = () => {
  const [user, setUser] = useState({loading: true})
  const [unread, setUnread] = useState(false)

  useEffect(()=>{
    fetch("http://192.168.0.42:3000/get/session")
    .then(res => res.json())
    .then(data =>{
      setUser(data)
      if (data.unread) setUnread(true)
    }).catch(()=>{
      setUser({})
    })
  }, [])

  return (
    <Routes>
      
      <Route path='/story/edit/:id'element={<StoryEdit user={user}/>}/>

      <Route path='/' element={<Nav unread={unread} user={user}/>}>
        <Route index element={<Home user={user}/>}/>
        <Route path='/search/:keyword' element={<Search/>}/>
        <Route path='/user/:name' element={<User/>}/>
        <Route path='/user/:name/about' element={<User about/>}/>
        <Route path='/story/:story' element={<Story/>}/>
        <Route path='/login' element={<Login user={user}/>}/>
        <Route path="*" element={<FourOFour/>}/>
      </Route>

      <Route path='/me' element={<Nav unread={unread} me user={user}/>}>
        <Route index element={<Navigate to={user.username? "/user/" + user.username: "/"}/>}/>
        <Route path="/me/stories" element={<Stories user={user}/>}>
          <Route index element={<Navigate to="/me/stories/drafts" replace/>}/>
          <Route path="/me/stories/drafts" element={<Posts draft path="drafts/null/"/>}/>
          <Route path="/me/stories/public" element={<Posts draft published path={"user/" + user.username + "/"}/>}/>
        </Route>
        <Route path="/me/list" element={<Bookmarks/>}/>
        <Route path="/me/notifications" element={<Notifications setUnread={setUnread}/>}/>
        <Route path="/me/settings" element={<Settings user={user}/>}/>
      </Route>

    </Routes>
  );
}

export default App;