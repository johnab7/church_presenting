import React, {useEffect, useState} from "react";
import {Formik} from "formik";
import Select from 'react-dropdown-select';
import Form from 'react-bootstrap/Form'
import tbible from "./data/biblet.json"
import bible from "./data/bible.json"
import Button from 'react-bootstrap/Button'

const Bible = () => {

    const options = [{ label: "Genesis", value: 1 }, { label: "Exodus", value: 2 }, { label: "Leviticus", value: 3 }, { label: "Numbers", value: 4 }, { label: "Deuteronomy", value: 5 }, { label: "Joshua", value: 6 }, { label: "Judges", value: 7 }, { label: "Ruth", value: 8 }, { label: "1 Samuel", value: 9 }, { label: "2 Samuel", value: 10 }, { label: "1 Kings", value: 11 }, { label: "2 Kings", value: 12 }, { label: "1 Chronicles", value: 13 }, { label: "2 Chronicles", value: 14 }, { label: "Ezra", value: 15 }, { label: "Nehemiah", value: 16 }, { label: "Esther", value: 17 }, { label: "Job", value: 18 }, { label: "Psalm", value: 19 }, { label: "Proverbs", value: 20 }, { label: "Ecclesiastes", value: 21 }, { label: "Song of Solomon", value: 22 }, { label: "Isaiah", value: 23 }, { label: "Jeremiah", value: 24 }, { label: "Lamentations", value: 25 }, { label: "Ezekiel", value: 26 }, { label: "Daniel", value: 27 }, { label: "Hosea", value: 28 }, { label: "Joel", value: 29 }, { label: "Amos", value: 30 }, { label: "Obadiah", value: 31 }, { label: "Jonah", value: 32 }, { label: "Micah", value: 33 }, { label: "Nahum", value: 34 }, { label: "Habakkuk", value: 35 }, { label: "Zephaniah", value: 36 }, { label: "Haggai", value: 37 }, { label: "Zechariah", value: 38 }, { label: "Malachi", value: 39 }, { label: "Matthew", value: 40 }, { label: "Mark", value: 41 }, { label: "Luke", value: 42 }, { label: "John", value: 43 }, { label: "Acts", value: 44 }, { label: "Romans", value: 45 }, { label: "1 Corinthians", value: 46 }, { label: "2 Corinthians", value: 47 }, { label: "Galatians", value: 48 }, { label: "Ephesians", value: 49 }, { label: "Philippians", value: 50 }, { label: "Colossians", value: 51 }, { label: "1 Thessalonians", value: 52 }, { label: "2 Thessalonians", value: 53 }, { label: "1 Timothy", value: 54 }, { label: "2 Timothy", value: 55 }, { label: "Titus", value: 56 }, { label: "Philemon", value: 57 }, { label: "Hebrews", value: 58 }, { label: "James", value: 59 }, { label: "1 Peter", value: 60 }, { label: "2 Peter", value: 61 }, { label: "1 John", value: 62 }, { label: "2 John", value: 63 }, { label: "3 John", value: 64 }, { label: "Jude", value: 65 }, { label: "Revelation", value: 66 }];
    const tb = [ { label: 'ఆదికాండము', value: 1 }, { label: 'నిర్గమకాండము', value: 2 }, { label: 'లేవీయకాండము', value: 3 }, { label: 'సంఖ్యాకాండము', value: 4 }, { label: 'ద్వితీయోపదేశకాండము', value: 5 }, { label: 'యెహోషువ', value: 6 }, { label: 'న్యాయాధిపతులు', value: 7 }, { label: 'రూతు', value: 8 }, { label: '1 సమూయేలు', value: 9 }, { label: '2 సమూయేలు', value: 10 }, { label: '1 రాజులు', value: 11 }, { label: '2 రాజులు', value: 12 }, { label: '1 దినవృత్తాంతములు', value: 13 }, { label: '2 దినవృత్తాంతములు', value: 14 }, { label: 'ఎజ్రా', value: 15 }, { label: 'నెహెమ్యా', value: 16 }, { label: 'ఎస్తేరు', value: 17 }, { label: 'యోబు', value: 18 }, { label: 'కీర్తనలు', value: 19 }, { label: 'సామెతలు', value: 20 }, { label: 'ప్రసంగి', value: 21 }, { label: 'పరమగీతము', value: 22 }, { label: 'యెషయా', value: 23 }, { label: 'యిర్మీయా', value: 24 }, { label: 'విలాపవాక్యములు', value: 25 }, { label: 'యెహెజ్కేలు', value: 26 }, { label: 'దానియేలు', value: 27 }, { label: 'హోషేయ', value: 28 }, { label: 'యోవేలు', value: 29 }, { label: 'ఆమోసు', value: 30 }, { label: 'ఓబద్యా', value: 31 }, { label: 'యోనా', value: 32 }, { label: 'మీకా', value: 33 }, { label: 'నహూము', value: 34 }, { label: 'హబక్కూకు', value: 35 }, { label: 'జెఫన్యా', value: 36 }, { label: 'హగ్గయి', value: 37 }, { label: 'జెకర్యా', value: 38 }, { label: 'మలాకీ', value: 39 }, { label: 'మత్తయి', value: 40 }, { label: 'మార్కు', value: 41 }, { label: 'లూకా', value: 42 }, { label: 'యోహాను', value: 43 }, { label: 'అపొస్తలుల కార్యములు', value: 44 }, { label: 'రోమా', value: 45 }, { label: '1 కొరింథీయులకు', value: 46 }, { label: '2 కొరింథీయులకు', value: 47 }, { label: 'గలతీయులకు', value: 48 }, { label: 'ఎఫెసీయులకు', value: 49 }, { label: 'ఫిలిప్పీయులకు', value: 50 }, { label: 'కొలొస్సయులకు', value: 51 }, { label: '1 థెస్సలొనీకయులకు', value: 52 }, { label: '2 థెస్సలొనీకయులకు', value: 53 }, { label: '1 తిమోతికి', value: 54 }, { label: '2 తిమోతికి', value: 55 }, { label: 'తీతుకు', value: 56 }, { label: 'ఫిలేమోనుకు', value: 57 }, { label: 'హెబ్రీయులకు', value: 58 }, { label: 'యాకోబు', value: 59 }, { label: '1 పేతురు', value: 60 }, { label: '2 పేతురు', value: 61 }, { label: '1 యోహాను', value: 62 }, { label: '2 యోహాను', value: 63 }, { label: '3 యోహాను', value: 64 }, { label: 'యూదా', value: 65 }, { label: 'ప్రకటన', value: 66 } ]
    var [previewLive, setPreviewLive] = useState();
    var [book, setBook] = useState();
    var [ref, setRef] = useState();
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
      
    function truncateString(string, limit) {
        if (string.length > limit) {
            return string.substring(0, limit) + "..."
        } else {
            return string
        }
    }
    const mc = new BroadcastChannel('mc');

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


    function clear() {
        sendLive(" ");
    }

    function getLive(l) {
        let br = "<br/>"
        let h = "<div style=\"padding: 2vh;\">"
        let f = "</div>"
        return h + l.e + br + l.t + br + br + l.r + f
        // return h + l.e + br+ br + l.r  + f
    }

    function getRef(bookf, chapter, verse,tbd) {
        return "-" + bookf.label + "," + " " + tbd + " " + + chapter + ":" + verse
    }
    
    function getVerce(bookf, chapter, verse) {
        let book = bookf.value
        var tbd = tb[book - 1].label
        let e = bible.Book[book - 1].Chapter[chapter - 1].Verse[verse - 1].Verse;
        let t = tbible.Book[book - 1].Chapter[chapter - 1].Verse[verse - 1].Verse;
        let r = getRef(bookf, chapter, verse,tbd)
        let c = {
            e: e,
            t: t,
            r: r
        }
        return c
    }

    return (
        <div>
            <br></br>
            <div className="cen">
                <p>{previewLive}</p>
            </div>
            <br></br>
            <div className='bible-select-div center'>
                <Formik
                    initialValues={{}}
                    onSubmit={(obj) => {
                        obj.book = book[0]
                        var l = getVerce(obj.book, obj.chapter, obj.verse)
                        setPreviewLive(l.e + " " + l.r)
                        sendLive(getLive(l))
                        setRef([obj.book, obj.chapter, obj.verse])
                        console.log(l.r)
                    }}
                >
                    {({
                          handleSubmit,
                          handleChange,

                      }) => (

                        <div>
                            <form
                                id="contact-form"
                                className="contact-form"
                                onSubmit={handleSubmit}

                            >
                                <Form.Group className="mb-3">
                                    <Form.Label>Book</Form.Label>
                                    <Select
                                        options={options}
                                        onChange={(values) => setBook(values)}
                                        clearable="true"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Chapter</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="chapter"
                                        name="chapter"
                                        min="1"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Verse</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="verse"
                                        name="verse"
                                        min="1"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <div className="cen">
                                    <Button type="submit" variant="primary" className="cen">Go Live</Button>
                                    <Button variant="warning" className="cen btn-mar"
                                            onClick={() => clear()}>Clear screen</Button>
                                    <Button onClick={() => openInNewTab(`https://www.biblegateway.com/passage/?search=${ref[0].label}%20${ref[1]}:${ref[2]}&version=KJV`)} variant="secondary" className="cen btn-mar">Open in BG</Button>

                                </div>
                            </form>
                            <br></br>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
}
export default Bible;