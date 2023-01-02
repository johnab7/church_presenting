import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'; // ES6


const Nav = () => {
    const mc = new BroadcastChannel('mc');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var [t, setT] = useState();

    function sendLive(mes) {
        mc.postMessage(mes)

    }

    function Qs(t) {
        sendLive(t)
        handleClose()
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Quick Send</Modal.Title>
                </Modal.Header>
                <Modal.Body><ReactQuill onChange={(values) => setT(values)}
                                        theme="bubble" /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => Qs(t)}>
                        Quick Send
                    </Button>
                </Modal.Footer>
            </Modal>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >Church Presentation Software</Navbar.Brand>
                    <Container>
                        <div><Button type="submit" variant="warning" onClick={() => sendLive(" ")} className="cen">Clear Screen</Button>
                            <Button type="submit" variant="primary" className="cen btn-mar" onClick={handleShow}>Quick Send</Button></div>
                    </Container>
                </Container>
                

            </Navbar>
        </div>
    );
}
export default Nav;