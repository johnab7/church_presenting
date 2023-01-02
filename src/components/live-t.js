import Button from 'react-bootstrap/Button'

const LiveT = () => {
    const mc = new BroadcastChannel('mc');
    function sendLive(mes) {
        mc.postMessage(mes)
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