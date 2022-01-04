import Nav from "./nav"
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Bible from "./bible"
import LiveT from "./live-t"
import Custom from "./custom";
const Admin = () => {
    return (
        <div>
            <Nav></Nav>
            <br></br>
            <br></br>
            <Tabs
                defaultActiveKey="bible"
                className="mb-3"
                style={{ justifyContent: "center" }}
            >
                <Tab eventKey="bible" title="Bible">
                    <Bible></Bible>
                </Tab>
                <Tab eventKey="live" title="Live">
                    <LiveT></LiveT>
                </Tab>

                <Tab eventKey="custom" title="Custom">
                    <Custom></Custom>
                </Tab>
                <Tab eventKey="settings" title="Settings">
                </Tab>

            </Tabs>
        </div>
    );
}
export default Admin;