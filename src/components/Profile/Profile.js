import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Shared/Context';
import Loading from '../Shared/Loading';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
    const[user,setUser]=useState([]);

    const auth=useContext(AuthContext);
    
    const loggedUser=auth.loggedInUser;

    console.log(auth.loggedInUser);
    return (
        <div>
            {
                loggedUser &&
                <ProfileInfo key={loggedUser._id} user={loggedUser}></ProfileInfo>
            }
        </div>
    );
};

export default Profile;