import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";

export function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Products</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">View</Nav.Link>
                    <Nav.Link href="/new">New</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
