import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Shared/Context';
import Loading from '../Shared/Loading';
import UserItem from './UserItem';
import './Users.css'

const Users = () => {

    const auth=useContext(AuthContext);
    if(!auth.users){
        return <Loading></Loading>
    }
    return (
        <div className="user-container">
            <ul>
                {
                    auth.users.map(user=><UserItem key={user._id} user={user}></UserItem>)
                }
            </ul>
        </div>
    );
};

export default Users;