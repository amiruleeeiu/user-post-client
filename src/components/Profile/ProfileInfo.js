import React, { useContext, useState } from 'react';
import CreatePostModel from '../../Models/CreatePostModel';
import PostItem from '../Posts/PostItem';
import { AuthContext } from '../Shared/Context';
import Loading from '../Shared/Loading';
import './ProfileInfo.css'

const ProfileInfo = (props) => {
    const auth=useContext(AuthContext);
    const[modalShow,setModalShow]=useState(false);
    const{image,name,email,posts}=props.user
    let exastingPost;

    if(auth.posts && posts){
        exastingPost=posts.map(pid=>{
            const currectPost=auth.posts.find(post=>post._id==pid);
            return currectPost;
        })
    }else{
        return <Loading></Loading>
    }
    return (
        <div className="post-container">
            <div className="profile-container">
                {/* <img src={image} className="rounded-circle" alt=""/> */}
                <div style={{marginLeft:'50px'}}>
                    <h1>{name}</h1>
                    <p>Email: {email}</p>
                </div>
            </div>
            <div className="create-post">
                {auth.loggedInUser && <img src={process.env.REACT_APP_BACKEND_URL+auth.loggedInUser.image} alt="" className="rounded-circle"/>}
                <input className="post-button" type="submit" value="What's on your mind ?" onClick={() => setModalShow(true)}/>
                <CreatePostModel show={modalShow}
                onHide={() => setModalShow(false)}></CreatePostModel>
            </div>
            <div>
            <ul>
                {
                    exastingPost.map(post=>{
                        if(post){
                            return <PostItem post={post}></PostItem>
                        }
                    })
                }
            </ul>
            </div>
        </div>
    );
};

export default ProfileInfo;