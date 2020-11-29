import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'

const SignUp = () => {
    const[signUpUser,setSignUpUser]=useState([]);
    const[file,setFile]=useState([]);

    const handleChange=(e)=>{
        const newUser={...signUpUser};
        newUser[e.target.name]=e.target.value;
        setSignUpUser(newUser);
    }

    const handleImage=(e)=>{
        const image=e.target.files[0]
        setFile(image);
    }

    const handleSubmit=()=>{
        
        const formData = new FormData()
            formData.append('file', file)
            formData.append('name', signUpUser.name);
            formData.append('email', signUpUser.email);
            formData.append('password', signUpUser.password);
            
            fetch(process.env.REACT_APP_BACKEND_URL+'user/signUp', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    window.location.pathname='/login'
                })
                .catch(error => {
                    console.error(error)
            })
    }

    return (
        <div className="auth-form">
            <form>
                <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" name="name" className="form-control" onBlur={handleChange} placeholder
                    ="Your Name"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onBlur={handleChange} placeholder
                    ="Enter a valid Email"/>
                </div>
                <div className="form-group">
                    <label>Upload Your image</label>
                    <br/>
                    <input type="file" onBlur={handleImage} placeholder
                    ="Upload an image"></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onBlur={handleChange} placeholder
                    ="Password at least 6 character"/>
                </div>
                <div className="form-group">
                    <input style={{backgroundColor:'green',color:'white',fontSize:'18px'}} type="reset" className="main-button form-control" value="Sign Up" onClick={handleSubmit}/>
                </div>
            </form>
            <div>
                <Link to="/login">Already have an account</Link>
            </div>
        </div>
    );
};

export default SignUp;