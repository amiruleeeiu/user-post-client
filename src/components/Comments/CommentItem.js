import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Shared/Context';
import './CommentItem.css'

const CommentItem = (props) => {
    const auth=useContext(AuthContext)
    let commentUser;


    if(auth && props.comment.comment){
        commentUser=auth.users.find(user=>user._id===props.comment.creator);
    }

    console.log(commentUser);
    return (
        <div style={{display:'flex',marginTop:'10px'}}>
            <div>
            <img style={{width:'40px',borderRadius:'50%',marginTop:'15px'}} src={process.env.REACT_APP_BACKEND_URL+commentUser.image} alt=""/>
            </div>
            <div className="comment-info">
                <Link to={"/users/"+commentUser._id}><p>{commentUser.name}</p></Link>
                <p>{props.comment.comment}</p>
            </div>
        </div>
    );
};

export default CommentItem;