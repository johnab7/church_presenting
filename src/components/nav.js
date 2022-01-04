import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'


const Nav = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >Church Presentation Software</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}
export default Nav;