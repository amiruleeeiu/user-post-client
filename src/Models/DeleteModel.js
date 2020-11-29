import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteModel = (props) => {
    const handleDelete=()=>{
        fetch(process.env.REACT_APP_BACKEND_URL+'post/'+props.id, {
            method: 'DELETE',
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
            <Modal.Header>
                <h4 style={{margin:'auto',color:'red'}}> Are Your Sure to delete this post ? </h4>
            </Modal.Header>
            <Modal.Body style={{margin:'auto',padding:'20px'}}>
                <Button style={{marginRight:'10px',width:'100px'}} onClick={handleDelete} variant="outline-danger">Yes</Button>
                <Button variant="outline-success" onClick={props.onHide} style={{marginLeft:'10px',width:'100px'}}>No</Button>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModel;