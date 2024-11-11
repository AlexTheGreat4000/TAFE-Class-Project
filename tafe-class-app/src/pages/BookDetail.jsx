import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { FirestoreContext } from "../contexts/FirestoreContext"
import { doc, getDoc } from "firebase/firestore"

export function BookDetail(props) {
    const [book, setBook] = useState()

    const params = useParams()
    const db = useContext(FirestoreContext)

    // function to get book data
    const getBookDetails = async () => {
        const ref = doc(db, "books", params.bookId)
        const details = await getDoc(ref)
        let bookObject = details.data()
        bookObject.id = details.id
        setBook(bookObject)
    }

    useEffect(() => {
        getBookDetails()
    }, [book])
    if (book) {
        document.title = book.title
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h1>{book.title}</h1>
                    </Col>
                    <Col md={6}>
                        <img className="img-fluid" src={book.cover} />
                    </Col>
                    <Col md={6}>
                        <p>{book.title} by {book.author}</p>
                        <p>{book.description}</p>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        )
    }
}