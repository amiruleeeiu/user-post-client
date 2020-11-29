import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from './components/Auth/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbar/Navbar";
import { AuthContext } from "./components/Shared/Context";
import Users from "./components/Users/Users";
import Posts from "./components/Posts/Posts";
import Profile from "./components/Profile/Profile";
import NewPost from "./components/NewPost/NewPost";
import UserProfile from "./components/Users/UserProfile";
import './App.css'

function App() {

  const[isLoggedIn,setIsLoggedIn]=useState(false);
  const[loggedInUser,setLoggedInUser]=useState([]);
  const[error,setError]=useState([])

    useEffect(()=>{
      const uId=localStorage.getItem('id');
      const sendRequest=async ()=>{
        try{
            const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}user/${uId}`)
            const resconseData=await response.json();
            setLoggedInUser(resconseData)
        }catch(err){
            setError(err)
          }
      }
      sendRequest();
    if(uId){
        setIsLoggedIn(true)
      }
      else{
        setIsLoggedIn(false)
      }
    },[])

    useEffect(()=>{
      
  },[])

  //posts
  const[posts,setPosts]=useState([]);

    useEffect(()=>{
        const sendRequest=async ()=>{
            try{
                const response=await fetch(process.env.REACT_APP_BACKEND_URL+'post')
                const resconseData=await response.json();
                setPosts(resconseData)
            }catch(err){
                setError(err)
            }
        }
        sendRequest();
    },[])

    //users
    const[users,setUsers]=useState([]);

    useEffect(()=>{
        const sendRequest=async ()=>{
            try{
                const response=await fetch(process.env.REACT_APP_BACKEND_URL+'user')
                const resconseData=await response.json();
                setUsers(resconseData)
            }catch(err){
                setError(err)
            }
        }
        sendRequest();
    },[])

  let routes;
  if(isLoggedIn){
    routes=(
      <Switch>
        <Route path="/users" exact>
          <Users></Users>
        </Route>
        <Route path="/" exact>
          <Posts></Posts>
        </Route>
        <Route path="/profile">
          <Profile></Profile>
        </Route>
        <Route path="/newPost">
          <NewPost></NewPost>
        </Route>
        <Route path="/users/:uId">
          <UserProfile></UserProfile>
        </Route>
      </Switch>
    )
  }else{
    routes=(
      <Switch>
        <Route path="/users" exact>
          <Users></Users>
        </Route>
        
        <Route path="/" exact>
          <Posts></Posts>
        </Route>
        <Route path="/signUp">
            <SignUp></SignUp>
          </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/users/:uId">
          <UserProfile></UserProfile>
        </Route>
      </Switch>
    );
  }


  return (
    <AuthContext.Provider 
      value={{isLoggedIn:isLoggedIn,loggedInUser:loggedInUser,posts:posts,users:users}}
    >
      <Router>
        <Navbar></Navbar>
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
