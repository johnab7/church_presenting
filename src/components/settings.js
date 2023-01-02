import React, { useState } from "react";
import Button from 'react-bootstrap/Button'

const Set = () => {
    var [f, setF] = useState();
    const mc = new BroadcastChannel('mc');

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            setF(e.target.result)
        };
    };
    function settingsHandleSubmit(event) {
        event.preventDefault()
        let tc = event.currentTarget.elements.color.value
        let bi = f
        let l = {
            tc:tc,
            bi:bi
        }
        localStorage.setItem("s",JSON.stringify(l))
        mc.postMessage(1)

    }
    return (
        <div className="cen">
            <br></br>
            <form onSubmit={settingsHandleSubmit}>
                <h5>Background Image:</h5>
                <input type="file"  className="btn-primary btn-mar" onChange={handleChange} />
                <br></br>
                <br></br>
                <h5>Text Color:</h5>
                <input type="color" id="color" name="color" />
                <br></br>
                <br></br>
                <Button type="submit" variant="primary" >Save</Button>

                </form>
        </div>
    );
}
export default Set;