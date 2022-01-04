import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.bubble.css'; // ES6

const Custom = () => {
    const mc = new BroadcastChannel('mc');
    var [items, setItems] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var [t, setT] = useState();
    useEffect(() => {
        let c = localStorage.getItem("c")
        c = JSON.parse(c)
        setItems(c)
    }, []);
    function sendLive(mes) {
        mc.postMessage(mes)
    }
    function del(d) {
        let c = localStorage.getItem("c")
        c = JSON.parse(c)
        if (d > -1) {
            c.splice(d, 1);
          }        localStorage.setItem("c",JSON.stringify(c))
        relode()
    }
    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            localStorage.setItem("c", e.target.result);
            relode()
        };
    };

    const downloadFile = ({ data, fileName, fileType }) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], { type: fileType })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    function relode() {
        setItems(JSON.parse(localStorage.getItem("c")))
    }
    const exportToJson = e => {
        e.preventDefault()
        downloadFile({
            data: localStorage.getItem("c"),
            fileName: 'downlode.cp',
            fileType: 'text/json',
        })
    }
    function clear() {
       localStorage.clear()
       relode()
    }
    function add(t) {
        let c = localStorage.getItem("c")
        c = JSON.parse(c)
        if (c) {
            c.push({
                c: t
            })
        }
        else {
            c = [{
                c: t
            }]
        }
        localStorage.setItem("c", JSON.stringify(c))
        relode()
        handleClose()
    }
    return (
        <div >
            <div className="cen">
                <Button variant="primary" onClick={handleShow}>
                    Add New
                </Button>
                <Button variant="success" className="btn-mar" type='button' onClick={exportToJson}>
                    Export
                </Button>
                <Button variant="warning" className="btn-mar" type='button' onClick={() => clear()}>
                    Clear
                </Button>
                <input type="file" accept=".cp" className="btn-primary btn-mar" onChange={handleChange} />

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New</Modal.Title>
                </Modal.Header>
                <Modal.Body><ReactQuill onChange={(values) => setT(values)}
                    theme="bubble" /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => add(t)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <br></br>
            <Row xs={1} md={5} className="g-4">

                {items && items.map((item) => (
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <div className="cen">
                                    <Card.Text>
                                        {item.c}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => sendLive(item.c)}>Go Live</Button>{"    "}
                                    <Button variant="danger" className="btm-mar" onClick={() => del(items.indexOf(item))}>Delete</Button>

                                </div>
                            </Card.Body>
                        </Card></Col>))}
            </Row>
        </div>
    );
}
export default Custom;