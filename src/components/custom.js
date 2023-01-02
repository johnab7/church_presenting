import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.bubble.css'; // ES6

const Custom = () => {
    const mc = new BroadcastChannel('mc');
    var [items, setItems] = useState();
    const [dEdit, setdEdit] = useState(null);
    const [EditIndex, setEditIndex] = useState(null);
    const [showG, setShowG] = useState(false);
    const [show, setShow] = useState(false);
    const [showE, setShowE] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseG = () => setShowG(false);
    const handleShowG = () => setShowG(true);
    const handleShowE = () => setShowE(true);
    const handleCloseE = () => setShowE(false);

    var [t, setT] = useState();
    useEffect(() => {
        var c = localStorage.getItem("c")
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
    function truncateString(string, limit) {
        if (string.length > limit) {
          return string.substring(0, limit) + "..."
        } else {
          return string
        }
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
            fileName: 'custom.cp',
            fileType: 'text/json',
        })
    }
    function clear() {
       localStorage.setItem("c","[]")
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

    function edit(s) {
        setdEdit(items[s].c)
        setEditIndex(s)
        handleShowE();
    }

    function editC(t) {
        var c = localStorage.getItem("c")
        c = JSON.parse(c)
    c[EditIndex] = {
            c:t
        }
        localStorage.setItem("c",JSON.stringify(c))
        relode()
        handleCloseE()
        setdEdit(null)
    }

    function Gen(text) {
        text = text.replace(/\d\. /g, "");
        text = text.replace(/\d\.  /g, "");
        text = text.replace(/\d\. /g, "");
        text = text.replace(/\d\./g, "");
        const array = text.split(/<p><br><\/p>/).map(chunk => ({ c: chunk })).filter(chunk => chunk.c !== "<p><br></p>");
        console.log(JSON.stringify(array));
        localStorage.setItem("c",JSON.stringify(array))
        relode()
        handleCloseG()
}
 


    return (
        <div >
            <div className="cen">
                <Button variant="primary" onClick={handleShow}>
                    Add New
                </Button>
                <Button variant="secondary" className="btn-mar" type='button' onClick={handleShowG}>
                Genarate
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

            <Modal show={showE} onHide={handleCloseE}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New</Modal.Title>
                </Modal.Header>
                <Modal.Body><ReactQuill defaultValue={dEdit} onChange={(values) => setT(values)}
                                        theme="bubble" /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseE}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => editC(t)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showG} onHide={handleCloseG}>
                <Modal.Header closeButton>
                    <Modal.Title>Genarate</Modal.Title>
                </Modal.Header>
                <Modal.Body><ReactQuill defaultValue={dEdit} onChange={(values) => setT(values)}
                                        theme="bubble" /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseG}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => Gen(t)}>
                        Genarate cp
                    </Button>
                </Modal.Footer>
            </Modal>

            <br></br>   
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">
                {items && items.map((item) => (
                    <Col style={{}}>
                        <Card style={{ width: '17rem' }}>
                            <Card.Body>
                                <div className="cen">
                                    <Card.Text>
                                        {truncateString(item.c, 600)}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => sendLive(item.c)}>Go Live</Button>{"    "}
                                    <Button variant="secondary" className="btm-mar" onClick={() => edit(items.indexOf(item))}>Edit</Button>
                                    <Button variant="danger" className="btm-mar" onClick={() => del(items.indexOf(item))}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card></Col>))}
            </div>
        </div>
    );
}
export default Custom;