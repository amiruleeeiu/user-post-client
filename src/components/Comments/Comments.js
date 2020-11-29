import React from 'react';
import CommentItem from './CommentItem';
import './Comments.css';

const Comments = (props) => {
    return (
        <div>
            {
                props.comments.map(comment=><CommentItem comment={comment}></CommentItem>)
            }
        </div>
    );
};

export default Comments;