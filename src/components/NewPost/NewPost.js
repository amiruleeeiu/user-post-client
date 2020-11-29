import React, { useState } from 'react';
import './NewPost.css'

const NewPost = () => {
    const[postInfo,setPostInfo]=useState([]);
    const[file,setFile]=useState([]);

    const handleChange=(e)=>{
        const newPost={...postInfo};
        newPost[e.target.name]=e.target.value;
        setPostInfo(newPost);
    }
    console.log(postInfo);
    const handleImage=(e)=>{
        const image=e.target.files[0]
        setFile(image);
    }
    const id=localStorage.getItem('id');
    const newPost={...postInfo,creator:`${id}`}
    console.log(process.env.REACT_APP_BACKEND_URL+'post');
    const handleSubmit=()=>{
            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', newPost.title);
            formData.append('description', newPost.description);
            formData.append('creator', newPost.creator);
            
            fetch(process.env.REACT_APP_BACKEND_URL+'post', {
                method: 'POST',
                body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    window.location.pathname='/'
                })
                .catch(error => {
                    console.error(error)
            })
    }
    return (
        <div className="newPost-container">
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" className="form-control" onBlur={handleChange} placeholder
                    ="Write a title"/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea type="text" rows="5" name="description" className="form-control" onBlur={handleChange} placeholder
                    ="Write a description"></textarea>
                </div>
                <div className="form-group">
                    <label>Upload an image</label>
                    <br/>
                    <input type="file" onBlur={handleImage} placeholder
                    ="Upload an image"></input>
                </div>
                <div className="form-group">
                    <input style={{backgroundColor:'green',color:'white',fontSize:'18px'}} type="reset" className="form-control" value="Submit Post" onClick={handleSubmit}/>
                </div>
            </form>
        </div>
    );
};

export default NewPost;