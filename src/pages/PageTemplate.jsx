import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function PageTemplate({ children }) {
    return (
        <div>
            <NavBar />
            <br></br>
            <Container>{children}</Container>
            <br></br>
            <hr></hr>
            <Footer />
        </div>
    );
}

function NavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Gogo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Search</Nav.Link>
                        <Nav.Link href="/plan">Plan</Nav.Link>
                        <Nav.Link href="/review">Review</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function Footer() {
    return (
        <Container>
            <footer>
                <ul>
                    <li>NEU CS5010 Project2</li>
                    <li>Lang Min</li>
                    <li>19 March 2025</li>
                </ul>
            </footer>
        </Container>
    )
}