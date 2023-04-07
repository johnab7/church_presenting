import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.bubble.css';
import {FormControl, InputGroup, ListGroup, Offcanvas} from "react-bootstrap";
import bible from "./data/bible.json"; // ES6

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
    const [showSidebar, setShowSidebar] = useState(false);

    var [t, setT] = useState();
    useEffect(() => {
        var c = localStorage.getItem("c")
        c = JSON.parse(c)
        setItems(c)
    }, []);
    function sendLive(mes) {
        mc.postMessage(mes)
        const s = JSON.parse(localStorage.getItem("s"));
        const ws = s && s.ws ? new WebSocket(`ws://${s.ws}:4444`) : null;
        if(ws){
            ws.onopen = function () {
                console.log('WebSocket connection established.');
                ws.send(JSON.stringify({
                    "request-type": "SetSourceSettings",
                    "sourceName": "cpLive",
                    "sourceSettings": {
                        "url": `data:text/html;charset=utf-8,<div class="box" style="  
    height: 100vh;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  ">
${encodeURIComponent(mes)}
</div>
<script>
(function(root, factory) {
  "use strict";

  // UMD shim
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Browser
    root.textFit = factory();
  }

}(typeof global === "object" ? global : this, function () {
  "use strict";

  var defaultSettings = {
    alignVert: false, // if true, textFit will align vertically using css tables
    alignHoriz: false, // if true, textFit will set text-align: center
    multiLine: false, // if true, textFit will not set white-space: no-wrap
    detectMultiLine: true, // disable to turn off automatic multi-line sensing
    minFontSize: 6,
    maxFontSize: 80,
    reProcess: true, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
    widthOnly: false, // if true, textFit will fit text to element width, regardless of text height
    alignVertWithFlexbox: false, // if true, textFit will use flexbox for vertical alignment
  };

  return function textFit(els, options) {

    if (!options) options = {};

    var settings = {};
    for(var key in defaultSettings){
      if(options.hasOwnProperty(key)){
        settings[key] = options[key];
      } else {
        settings[key] = defaultSettings[key];
      }
    }

    if (typeof els.toArray === "function") {
      els = els.toArray();
    }

    var elType = Object.prototype.toString.call(els);
    if (elType !== '[object Array]' && elType !== '[object NodeList]' &&
            elType !== '[object HTMLCollection]'){
      els = [els];
    }

    for(var i = 0; i < els.length; i++){
      processItem(els[i], settings);
    }
  };

  function processItem(el, settings){
    if (!isElement(el) || (!settings.reProcess && el.getAttribute('textFitted'))) {
      return false;
    }

    if(!settings.reProcess){
      el.setAttribute('textFitted', 1);
    }

    var innerSpan, originalHeight, originalHTML, originalWidth;
    var low, mid, high;

    originalHTML = el.innerHTML;
    originalWidth = innerWidth(el);
    originalHeight = innerHeight(el);

    if (!originalWidth || (!settings.widthOnly && !originalHeight)) {
      if(!settings.widthOnly)
        throw new Error('Set a static height and width on the target element ' + el.outerHTML +
          ' before using textFit!');
      else
        throw new Error('Set a static width on the target element ' + el.outerHTML +
          ' before using textFit!');
    }

    if (originalHTML.indexOf('textFitted') === -1) {
      innerSpan = document.createElement('span');
      innerSpan.className = 'textFitted';
      innerSpan.style['display'] = 'inline-block';
      innerSpan.innerHTML = originalHTML;
      el.innerHTML = '';
      el.appendChild(innerSpan);
    } else {
      innerSpan = el.querySelector('span.textFitted');
      // Remove vertical align if we're reprocessing.
      if (hasClass(innerSpan, 'textFitAlignVert')){
        innerSpan.className = innerSpan.className.replace('textFitAlignVert', '');
        innerSpan.style['height'] = '';
        el.className.replace('textFitAlignVertFlex', '');
      }
    }

    if (settings.alignHoriz) {
      el.style['text-align'] = 'center';
      innerSpan.style['text-align'] = 'center';
    }

    var multiLine = settings.multiLine;
    if (settings.detectMultiLine && !multiLine &&
        innerSpan.getBoundingClientRect().height >= parseInt(window.getComputedStyle(innerSpan)['font-size'], 10) * 2){
      multiLine = true;
    }

    if (!multiLine) {
      el.style['white-space'] = 'nowrap';
    }

    low = settings.minFontSize;
    high = settings.maxFontSize;

    var size = low;
    while (low <= high) {
      mid = (high + low) >> 1;
      innerSpan.style.fontSize = mid + 'px';
      var innerSpanBoundingClientRect = innerSpan.getBoundingClientRect();
      if (
        innerSpanBoundingClientRect.width <= originalWidth 
        && (settings.widthOnly || innerSpanBoundingClientRect.height <= originalHeight)
      ) {
        size = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    if( innerSpan.style.fontSize != size + 'px' ) innerSpan.style.fontSize = size + 'px';

    if (settings.alignVert) {
      addStyleSheet();
      var height = innerSpan.scrollHeight;
      if (window.getComputedStyle(el)['position'] === "static"){
        el.style['position'] = 'relative';
      }
      if (!hasClass(innerSpan, "textFitAlignVert")){
        innerSpan.className = innerSpan.className + " textFitAlignVert";
      }
      innerSpan.style['height'] = height + "px";
      if (settings.alignVertWithFlexbox && !hasClass(el, "textFitAlignVertFlex")) {
        el.className = el.className + " textFitAlignVertFlex";
      }
    }
  }

  function innerHeight(el){
    var style = window.getComputedStyle(el, null);
    return el.getBoundingClientRect().height -
      parseInt(style.getPropertyValue('padding-top'), 10) -
      parseInt(style.getPropertyValue('padding-bottom'), 10);
  }

  function innerWidth(el){
    var style = window.getComputedStyle(el, null);
    return el.getBoundingClientRect().width -
      parseInt(style.getPropertyValue('padding-left'), 10) -
      parseInt(style.getPropertyValue('padding-right'), 10);
  }

  function isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  }

  function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  function addStyleSheet() {
    if (document.getElementById("textFitStyleSheet")) return;
    var style = [
      ".textFitAlignVert{",
        "position: absolute;",
        "top: 0; right: 0; bottom: 0; left: 0;",
        "margin: auto;",
        "display: flex;",
        "justify-content: center;",
        "flex-direction: column;",
      "}",
      ".textFitAlignVertFlex{",
        "display: flex;",
      "}",
      ".textFitAlignVertFlex .textFitAlignVert{",
        "position: static;",
      "}",].join("");

    var css = document.createElement("style");
    css.type = "text/css";
    css.id = "textFitStyleSheet";
    css.innerHTML = style;
    document.body.appendChild(css);
  }
}));
textFit(document.getElementsByClassName('box'));
</script>`
                    },
                    "message-id": "1"
                }));
                ws.close();
            };
        }
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
                {showSidebar ? (
                    <Button
                        variant="secondary"
                        className="cen btn-mar"
                        onClick={() => setShowSidebar(false)}
                    >
                        Hide Sidebar
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        className="cen btn-mar"
                        onClick={() => setShowSidebar(true)}
                    >
                        Show Sidebar
                    </Button>
                )}
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
                {items && items.map((item,index) => (
                    <Col style={{}} key={index}>
                        <Card style={{ width: '17rem' }}>
                            <Card.Body>
                                <div className="cen" >
                                    <Card.Text className="cus">
                                        <div  dangerouslySetInnerHTML={{ __html: item.c }} />
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => sendLive(item.c)}>Go Live</Button>{"    "}
                                    <Button variant="secondary" className="btm-mar" onClick={() => edit(items.indexOf(item))}>Edit</Button>
                                    <Button variant="danger" className="btm-mar" onClick={() => del(items.indexOf(item))}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card></Col>))}
            </div>

            <Offcanvas
                show={showSidebar}
                onHide={() => setShowSidebar(false)}
                scroll={true}
                backdrop={false}
                placement={"end"}
            >
            <Offcanvas.Header closeButton/>
            <Offcanvas.Body>
                <ListGroup>
                    {items && items.map((item,index) => (
                        <ListGroup.Item key={index} className="cus" onClick={() => sendLive(item.c)}>
                            <div  dangerouslySetInnerHTML={{ __html: item.c }} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>


        </div>
    );
}
export default Custom;