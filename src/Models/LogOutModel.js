import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const LogOutModel = (props) => {

    const handleConform=()=>{
        console.log('yes');
        localStorage.removeItem('id');
        window.location.pathname='/';
    }
    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <h4 style={{margin:'auto',color:'red'}}> Are Your Sure to log out ? </h4>
        </Modal.Header>
        <Modal.Body style={{margin:'auto',padding:'20px'}}>
            <Button style={{marginRight:'10px',width:'100px'}} onClick={handleConform} variant="outline-danger">Conform</Button>
            <Button variant="outline-success" onClick={props.onHide} style={{marginLeft:'10px',width:'100px'}}>No</Button>
        </Modal.Body>
    </Modal>
    );
};

export default LogOutModel;