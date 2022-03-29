import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"

function DashboardModal ({ show, setShow, selectedTable }) {
    const handleClose = () => setShow(false);
    console.log("this is the selected table", selectedTable)
    return (
        <>
            <Modal 
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Is this table ready to seat new guests? This cannot be undone.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cancel
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Yes
                </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}

export default DashboardModal;