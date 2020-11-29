import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const CreatePostModel = (props) => {
    const[postInfo,setPostInfo]=useState(null);
    const[file,setFile]=useState([]);

    const handleChange=(e)=>{
        const newPost={...postInfo};
        newPost[e.target.name]=e.target.value;
        setPostInfo(newPost);
    }
    console.log(postInfo,file);
    const handleImage=(e)=>{
        const image=e.target.files[0]
        setFile(image);
    }
    const id=localStorage.getItem('id');
    const newPost={...postInfo,creator:`${id}`}
console.log(`${process.env.REACT_APP_BACKEND_URL}post`);
    const handleSubmit=()=>{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', newPost.title);
        formData.append('description', newPost.description);
        formData.append('creator', newPost.creator);
        
        fetch(`${process.env.REACT_APP_BACKEND_URL}post`, {
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
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header style={{backgroundColor:'rgb(0, 124, 124)',color:'white'}} closeButton>
                <h4 style={{marginLeft:'150px'}}>Create Post </h4>
            </Modal.Header>
            <Modal.Body>
                <div>
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
                            {
                                postInfo ? <input style={{backgroundColor:'rgb(6, 164, 255)',color:'white',fontSize:'18px'}} type="reset" className="form-control" value="Submit Post" onClick={handleSubmit}/>
                                : <input style={{backgroundColor:'  rgb(171, 171, 172)',color:'white',fontSize:'18px'}} type="reset" className="form-control" value="Submit Post" onClick={handleSubmit} disabled/>
                            }
                            
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default CreatePostModel;