import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import DeleteModel from '../../Models/DeleteModel';
import UpdateModel from '../../Models/UpdateModel';
import Comments from '../Comments/Comments';
import Model from '../Model/Model';
import { AuthContext } from '../Shared/Context';
import './PostItem.css'
import { FaRegCommentAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import Loading from '../Shared/Loading';

const PostItem = (props) => {
    
    const[users,setUsers]=useState([]);
    const[error,setError]=useState([]);
    const[fullDescription,setFullDescription]=useState(false);
    const[loggedInUserPost,setLoggedInUserPost]=useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const[deleteModalShow,setDeleteModalShow]=React.useState(false);
    const[commentInfo,setCommentInfo]=useState([]);
    const[comments,setComments]=useState([])
    const[showComments,setShowComments]=useState(false);

    const{title,img,description,creator,_id}=props.post;

    const auth=useContext(AuthContext);

    
    //create comment
    const[newComment,setNewComment]=useState({
        comment:'',
        creator:auth.loggedInUser._id,
        postId:_id
    });
    //filter post comment
    const exastingComments=commentInfo.filter(comment=>comment.postId===_id);

    useEffect(()=>{
        if(auth.loggedInUser && auth.loggedInUser._id===creator){
            setLoggedInUserPost(true);
        }
    },[])

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
    const user=users.find(user=>user._id===creator);
    const shortDescription=description.slice(0,100);

    const handleMoreDescription=()=>{
        setFullDescription(true)
    }
    const handleLessDescription=()=>{
        setFullDescription(false)
    }

    const handleChange=(e)=>{
        const createComment={...newComment};
        createComment[e.target.name]=e.target.value;
        setNewComment(createComment);
    }

    const handleComment=()=>{
        fetch (process.env.REACT_APP_BACKEND_URL+'post/comment',{
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
        .then((res) => res.json())
        .then((data) =>{
            window.location.pathname='/'
            
        })
    }

    // get comment

    useEffect(()=>{
        const sendRequest=async ()=>{
            try{
                const response=await fetch(process.env.REACT_APP_BACKEND_URL+'post/comment')
                const resconseData=await response.json();
                setCommentInfo(resconseData)
            }catch(err){
                setError(err)
            }
        }
        sendRequest();
    },[])

    ///handleOpenComments
    const handleOpenComments=()=>{
        setShowComments(true);
    }

    const handleCloseComments=()=>{
        setShowComments(false)
    }
    

    return (
        <li className="postItem-container">
            <div className="d-flex justify-content-between">
                <h4>{title}</h4>
                {
                    loggedInUserPost && 
                    <div>
                        <Link style={{marginRight:'10px'}}onClick={() => setModalShow(true)} to="#" >Update</Link>
                        <UpdateModel show={modalShow}
                        onHide={() => setModalShow(false)} title={title} description={description} id={_id}></UpdateModel>

                        <Link to="#" onClick={() => setDeleteModalShow(true)}>Delete</Link>
                        <DeleteModel show={deleteModalShow} onHide={() => setDeleteModalShow(false)}  id={_id}></DeleteModel>
                    </div>
                }
            </div>
            <img src={process.env.REACT_APP_BACKEND_URL+img} alt="title"/>
            
            {
                fullDescription ? <p>{description}<span> <Link to="#" onClick={handleLessDescription}>Less More</Link></span></p>
                : <p>{shortDescription} . . . <span> <Link to="#" onClick={handleMoreDescription}>See More</Link></span></p>
            }
            
            {user && <Link style={{float:'right'}} to={"/users/"+creator}>Post By {user.name}</Link>}
            <br/>
            {
                auth.isLoggedIn && auth.loggedInUser &&
                <div className="comment-content">
                    <img src={process.env.REACT_APP_BACKEND_URL+auth.loggedInUser.image} alt=""/>
                    <form style={{display:'flex'}}>
                        <input type="text" style={{padding:'20px',marginLeft:'20px'}} name="comment" onBlur={handleChange} placeholder="Write a Comment..."/>
                        <input variant="light" className="comment-button" style={{width:'70px'}} type="reset" onClick={handleComment} value="Send"/>
                    </form>
                </div>
            }
            <div className="like-comment-button d-flex align-items-center justify-content-around">
                <button  variant="light"><BiLike/> Like</button>
                {
                    showComments ?
                    <button  variant="light" onClick={handleCloseComments}>Close Comment</button>
                    : <button  variant="light" onClick={handleOpenComments}><FaRegCommentAlt/> Comment</button>
                }
                <p style={{marginLeft:'20px'}}>{exastingComments.length} Comments</p>
            </div>
            {
                showComments && <Comments comments={exastingComments}></Comments>
            }
        </li>
    );
};

export default PostItem;