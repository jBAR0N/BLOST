import React, { useEffect, useState } from 'react';
import {Route, Routes} from "react-router-dom";
import Nav from "./components/nav/nav";
import Home from './components/home/home';
import Followed from './components/followed/followed';
import Bookmarks from './components/bookmarks';
import Profile from './components/profile/profile';
import FourOFour from './components/404/404';
import UserPosts from './components/userposts';
import UserEdit from './components/useredit/useredit';
import Login from './components/login/login';
import NewUser from './components/newuser/newuser';
import User from './components/user/user';
import Error from './components/error/error';
import Article from './components/article/article';
import DeleteProfile from './components/profile-form/deleteProfile';
import ChangePassword from './components/profile-form/changePassword';
import UserDrafts from './components/userdrafts';
import EditArticle from './components/article-edit/article-edit';
import NewArticle from './components/article-new/article-new';
import PublishArticle from './components/article-publish/article-publish';

function App() {
  const [user, setUser] = useState({loading: true})
  const [img, setImg] = useState("/img/user.png")
  const [error, setError] = useState(null)

  useEffect(()=>{
    fetch("http://localhost:3000/get/session")
    .then(res => res.json())
    .then(res =>{
      setUser(res)
      if (res.image) {
        fetch("http://localhost:3000/image/" + res.image)
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
    <React.Fragment>
      <Error setError={setError} error={error}/>
      <div className='content-wr'>
        <Routes>
          <Route path='/article/create/new'element={<NewArticle user={user}/>}/>
          <Route path='/article/publication/:id'element={<PublishArticle/>}/>
          <Route path='/article/settings/:id'element={<PublishArticle/>}/>
          <Route path='/article/edit/:id'element={<EditArticle/>}/>
          <Route path='/profile/delete' element={<DeleteProfile user={user} setError={setError}/>}/>
          <Route path='/profile/password' element={<ChangePassword user={user} setError={setError}/>}/>
          <Route path='/profile/new' element={<NewUser user={user} setError={setError} img={img}/>}/>
          <Route path='/login' element={<Login user={user} setError={setError}/>}/>
          <Route path='/' element={<Nav img={img} user={user}/>}>
            <Route index element={<Home mode="date" setError={setError}/>}/>
            <Route path='/search/:keyword' element={<Home mode="search" setError={setError}/>}/>
            <Route path='/tag/:keyword' element={<Home mode="tag" setError={setError}/>}/>
            <Route path='/article/:article' element={<Article/>}/>
            <Route path="/followed" element={<Followed setError={setError} user={user}/>}/>
            <Route path='/user/:name' element={<User setError={setError}/>}/>
            <Route path="/bookmarks" element={<Bookmarks setError={setError} user={user}/>}/>
            <Route path="/profile" element={<Profile img={img} user={user}/>}>
              <Route index element={<UserDrafts setError={setError} user={user}/>}/>
              <Route path="/profile/articles" element={<UserPosts setError={setError} user={user}/>}/>
              <Route path="/profile/edit" element={<UserEdit setError={setError} user={user}/>}/>
            </Route>
            <Route path="*" element={<FourOFour/>}/>
          </Route>
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;