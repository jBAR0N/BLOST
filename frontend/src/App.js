import React, { useEffect, useState } from 'react';
import {Route, Routes} from "react-router-dom";
import Nav from "./components/nav/nav";
import Home from './components/home/home';
import Followed from './components/followed/followed';
import Bookmarks from './components/bookmarks/bookmarks';
import Profile from './components/profile/profile';
import FourOFour from './components/404/404';
import UserPosts from './components/userposts/userposts';
import UserHistory from './components/userhistory/userhistory';
import UserStats from './components/userstats/userstats';
import UserEdit from './components/useredit/useredit';
import Login from './components/login/login';
import NewUser from './components/newuser/newuser';
import User from './components/user/user';
import Error from './components/error/error';
import Article from './components/article/article';
import DeleteProfile from './components/deleteProfile/deleteProfile';
import ChangePassword from './components/changePasword/changePassword';

function App() {
  const [user, setUser] = useState({})
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
  }, [])

  return (
    <div className="page-wr">
      <Error setError={setError} error={error}/>
      <div className='content-wr'>
        <Routes>
          <Route path='/about' element={<React.Fragment/>}/>
          <Route path='/article/:article' element={<Article/>}/>
          <Route path='/create/:id'element={<React.Fragment/>}/>
          <Route path='/profile/delete' element={<DeleteProfile user={user} setError={setError}/>}/>
          <Route path='/profile/password' element={<ChangePassword user={user} setError={setError}/>}/>
          <Route path='/newUser' element={<NewUser user={user} setError={setError} img={img}/>}/>
          <Route path='/login' element={<Login user={user} setError={setError}/>}/>
          <Route path='/' element={<Nav img={img} user={user}/>}>
            <Route index element={<Home setError={setError}/>}/>
            <Route path="/followed" element={<Followed user={user}/>}/>
            <Route path='/user/:name' element={<User/>}/>
            <Route path="/bookmarks" element={<Bookmarks user={user}/>}/>
            <Route path="/profile" element={<Profile img={img} user={user}/>}>
              <Route index element={<UserPosts/>}/>
              <Route path="/profile/history" element={<UserHistory/>}/>
              <Route path="/profile/stats" element={<UserStats/>}/>
              <Route path="/profile/edit" element={<UserEdit setError={setError} user={user}/>}/>
            </Route>
            <Route path="*" element={<FourOFour/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
// TODO make these route names better

export default App;