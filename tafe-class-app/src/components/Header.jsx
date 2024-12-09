import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header(props) {
    const authState = useContext(AuthContext)

    if (!authState) {
        return (
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="https://img.icons8.com/?size=94&id=ADLVLEVwdHGD&format=png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Australian University Library Logo"
                        />
                        {" "}
                        Australian University Library
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
    else if (authState && props.mode == false) {
        return (
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="/src/assets/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Australian University Library Logo"
                        />
                        {" "}
                        Australian University Library
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
    else if (authState && props.mode == true) {
        return (
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src="/src/assets/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Australian University Library Logo"
                        />
                        {" "}
                        Australian University Library
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/admin/addbook">Add Book</Nav.Link>
                            <Nav.Link as={Link} to="/admin/listloans">Loans</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}