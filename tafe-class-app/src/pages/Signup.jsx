import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

export function Signup (props) {
    const signUpUser = (event) => {
        event.preventDefault()
        const formdata = new FormData(event.target)
        const email = formdata.get("email")
        const password = formdata.get("password")
        createUserWithEmailAndPassword( props.authapp, email, password )
        .then( (response) => Navigate("/") )
        .catch( (error) => console.log(error) )
    }
    return (
        <>
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Form className="mt-4" onSubmit={(event) => signUpUser(event)}>
                            <h2>Sign up for an account</h2>
                            <Form.Group className="mt-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="you@domain.com"
                                    name="email"
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="minimum 6 characters"
                                    name="password"
                                />
                            </Form.Group>
                            <Button type="submit" variant="dark" className="my-3 mx-auto d-block w-100">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}