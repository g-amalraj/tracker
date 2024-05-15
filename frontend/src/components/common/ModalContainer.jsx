import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalContainer = ({ title, show, setShow, children, cancel = "Close", ok = "Submit", handleSubmit }) => {
    return (
        <Modal show={show} onHide={() => setShow(false)} >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)} variant="secondary" >
                    {cancel}
                </Button>
                <Button variant="primary" onClick={handleSubmit} >
                    {ok}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalContainer