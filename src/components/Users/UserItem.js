import React from 'react';
import { Link } from 'react-router-dom';
import './UserItem.css';

const UserItem = (props) => {
    
    const{name,image,email,_id}=props.user;
    console.log(process.env.REACT_APP_BACKEND_URL+image);
    return (
        <div className="user-item-container">
            <img src={process.env.REACT_APP_BACKEND_URL+image} class="rounded-circle" alt=""/>
           <div style={{marginLeft:'20px'}}>
                <Link to={"/users/"+_id}><h4>{name}</h4></Link>
                <p>Email: {email}</p>
           </div>
        </div>
    );
};

export default UserItem;