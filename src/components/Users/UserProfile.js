import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileInfo from '../Profile/ProfileInfo';
import { AuthContext } from '../Shared/Context';

const UserProfile = () => {
    const auth=useContext(AuthContext);
    const {uId}=useParams();

    const correntUser=auth.users.find(user=>user._id===uId);
    console.log(correntUser);
    console.log(uId);

    return (
        <div>
            {correntUser && <ProfileInfo user={correntUser}></ProfileInfo>}
        </div>
    );
};

export default UserProfile;