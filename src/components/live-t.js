import Button from 'react-bootstrap/Button'

const LiveT = () => {
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
    const openWindow = () => {
        window.open(
            "/live",
            "live",
            "fullscreen=yes"
        );
    };
    return (
        <div>
            <div className="cen">
                <br></br>
                <Button onClick={openWindow} variant="primary">Open Live</Button>
                <Button className="btn-mar"
                    onClick={() => {
                        sendLive("Praise The Lord");
                    }}
                >
                    Display Test Message
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <h2>Live Preview</h2>

                <br></br>
                <iframe title='preview'  src={window.location.origin + "/live"}>

                </iframe>
            </div>

        </div>
    );
}
export default LiveT;