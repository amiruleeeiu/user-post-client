import { Button, Modal } from 'react-bootstrap';
import React, { useState } from 'react';

const UpdateModel = (props) => {
    const title=props.title;
    const description=props.description

    const[postInfo,setPostInfo]=useState({
        title:title,
        description:description
    });

    const handleChange=(e)=>{
        const newPost={...postInfo};
        newPost[e.target.name]=e.target.value;
        setPostInfo(newPost);
    }
    const handleSubmit=()=>{
        fetch (process.env.REACT_APP_BACKEND_URL+'post/'+props.id,{
            method: 'PATCH',
            body: JSON.stringify(postInfo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data);
            window.location.pathname='/';
        })
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <div style={{}}>
            <Modal.Header style={{margin:'auto',color:'white',backgroundColor:'rgb(0, 124, 124)'}} closeButton>
                <h4 >Do You Want to Update Your Post ? </h4>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name="title" className="form-control" onBlur={handleChange} placeholder
                        ="Write a title" defaultValue={postInfo.title}/>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea type="text" rows="5" name="description" className="form-control" onBlur={handleChange} placeholder
                        ="Write a description" defaultValue={postInfo.description}></textarea>
                    </div>
                    <div className="form-group" style={{textAlign:'center'}}>
                        {/* <input style={{backgroundColor:'#1b7fa1',color:'white',fontSize:'18px'}} type="reset" className="form-control" value="Submit Post" onClick={handleSubmit}/> */}

                        <Button variant="outline-success" style={{marginRight:'20px'}} onClick={handleSubmit}>Update Post</Button>
                        <Button variant="outline-secondary" onClick={props.onHide}>Cancel</Button>
                    </div>
                </form>
            </Modal.Body>
            </div>
        </Modal>
    );
};

export default UpdateModel;