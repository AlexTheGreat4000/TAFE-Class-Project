import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

import { collection, addDoc } from "firebase/firestore"
import { FirestoreContext } from "../../contexts/FirestoreContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

export function AddBook(props) {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    let alertType = 'success'

    const db = useContext(FirestoreContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(props.mode == false) {
            navigate('/signin')
        }
    }, [props.mode])

    const createBook = async(event) => {
        event.preventDefault()
        const fd = new FormData(event.target)
        const book = {
            title: fd.get('title'),
            author: fd.get('author'),
            publisher: fd.get('publisher'),
            cover: fd.get('cover'),
            genre: fd.get('genre'),
            language: fd.get('language'),
            active: true
        }
        const ref = collection(db, "books")
        const docRef = await addDoc(ref, book)
        if(docRef.id) {
            alertType = "success"
            setMessage('Adding book was successful')
            event.target.reset()
            setShow(true)
        }
        else {
            alertType = "danger"
            setMessage('Adding book failed!')
            setShow(true)
        }
        setTimeout(() => {setShow(false)}, 3000)
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form id="add-book-form" onSubmit={(evt) => createBook(evt)}>
                        <h2 className="mt-4">Add a book</h2>
                        <Form.Group className="mt-2">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Book Title"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Book Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                placeholder="Book Author"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Book Publisher</Form.Label>
                            <Form.Control
                                type="text"
                                name="publisher"
                                placeholder="Book Publisher"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>ISBN (Old)</Form.Label>
                            <Form.Control
                                type="text"
                                name="cover"
                                placeholder="10 Digit ISBN Number"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>ISBN (New)</Form.Label>
                            <Form.Control
                                type="text"
                                name="cover"
                                placeholder="13 Digit ISBN Number"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Pages</Form.Label>
                            <Form.Control
                                type="text"
                                name="cover"
                                placeholder="Number of Pages"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="cover"
                                placeholder="Link to Cover Image"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="cover"
                                placeholder="Book Description"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Book Genre</Form.Label>
                            <Form.Select name="genre">
                                <option>Select Genre</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Dystopian">Dystopian</option>
                                <option value="Romance">Romance</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Thriller">Thriller</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Language</Form.Label>
                            <Form.Select name="language">
                                <option>Select Language</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Italian">Italian</option>
                                <option value="Hindi">Hindi</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="mt-4 w-100">Add Book</Button>
                    </Form>
                    <Alert variant={alertType} show={show} className="mt-4">
                        {message}
                    </Alert>
                </Col>
            </Row>
        </Container>
    )
}