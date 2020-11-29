import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Shared/Context';

const Login = () => {
    const auth=useContext(AuthContext);
    const[loggedInUser,setLoggedInUser]=useState([])
    const[loginUser,setLoginUser]=useState([]);
    if(loggedInUser){
        localStorage.setItem('id',loggedInUser);
    }

    const handleChange=(e)=>{
        const newUser={...loginUser};
        newUser[e.target.name]=e.target.value;
        setLoginUser(newUser);
    }
    const handleSubmit=()=>{
        fetch (process.env.REACT_APP_BACKEND_URL+'user/login',{
            method: 'POST',
            body: JSON.stringify(loginUser),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
        .then((res) => res.json())
        .then((data) =>{
            setLoggedInUser(data.user._id)
            window.location.pathname='/';
        })
    }
    return (
        <div className="auth-form">
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onBlur={handleChange} placeholder
                    ="Enter a valid Email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onBlur={handleChange} placeholder
                    ="Password at least 6 character"/>
                </div>
                <div className="form-group">
                    <input style={{backgroundColor:'green',color:'white',fontSize:'18px'}} type="reset" className="main-button form-control" value="Log In" onClick={handleSubmit}/>
                </div>
            </form>
            <div>
                <Link to="/signUp">Create an account</Link>
            </div>
        </div>
    );
};

export default Login;