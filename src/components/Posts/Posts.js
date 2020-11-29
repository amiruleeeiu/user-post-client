import React, { useContext, useEffect, useState } from 'react';
import PostItem from './PostItem';
import './Post.css';
import { AuthContext } from '../Shared/Context';
import Loading from '../Shared/Loading';
import { Button } from 'react-bootstrap';
import CreatePostModel from '../../Models/CreatePostModel';

const Posts = () => {

    const[modalShow,setModalShow]=useState(false);
    const auth=useContext(AuthContext);
    // if(!auth.loggedInUser){
    //     return <Loading></Loading>
    // }
    return (
        <div className="post-container">
            {
                auth.isLoggedIn && 
                <div className="create-post">
                    {
                        auth.loggedInUser &&
                        <img src={process.env.REACT_APP_BACKEND_URL+auth.loggedInUser.image} alt="" className="rounded-circle"/>
                    }
                    <input className="post-button" type="submit" value="What's on your mind ?" onClick={() => setModalShow(true)}/>
                    <CreatePostModel show={modalShow}
                    onHide={() => setModalShow(false)}></CreatePostModel>
                </div>
            }
            <ul>
                {
                    auth.posts &&
                    auth.posts.map(post=><PostItem key={post._id} post={post}></PostItem>)
                }
            </ul>
        </div>
    );
};

export default Posts;