import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutModel from '../../Models/LogOutModel';
import { AuthContext } from '../Shared/Context';
import './Navbar.css'
import { RiHome4Fill } from "react-icons/ri";

const Navbar = () => {
    const auth=useContext(AuthContext);
    const[conformModal,setConformModal]=useState(false);
    
    return (
        <div>
            <div className="navbar-container">
                <a href="/" style={{fontSize:'20px'}}><RiHome4Fill /></a>
                {auth.isLoggedIn && <a href="/profile">MY PROFILE</a>}
                <a href="/users">ALL USERS</a>
                {/* {auth.isLoggedIn && <a href="/newPost">CREATE POST</a>} */}
                {!auth.isLoggedIn && <a href="/signUp">ATHENTICATION</a>}
                {auth.isLoggedIn && <Link to="#" onClick={() => setConformModal(true)}>LOGOUT</Link>}

                <LogOutModel show={conformModal} onHide={() => setConformModal(false)}></LogOutModel>
            </div>
        </div>
    );
};

export default Navbar;