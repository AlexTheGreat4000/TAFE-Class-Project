import { useContext, useState, useEffect } from "react"
import { FirestoreContext } from "../contexts/FirestoreContext"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"

export function Home(props) {
    const [bookdata, setBookData] = useState([])
    let booksLoaded = false

    const db = useContext(FirestoreContext)

    const getBooks = async () => {
        const booksCollection = collection(db, "books")
        const result = await getDocs(booksCollection)
        let booksArray = []
        result.forEach((doc) => {
            let book = doc.data()
            book.id = doc.id
            booksArray.push(book)
        })
        setBookData(booksArray)
    }

    useEffect(() => {
        if (booksLoaded == false) {
            getBooks()
            booksLoaded = true
        }
    }, [booksLoaded])

    const Books = bookdata.map((book) => {
        return (
            <Col md={1}>
                <Card>
                    <Card.Img 
                        variant="top"
                        src={book.cover}
                        style={{maxWidth:"100%"}}
                        className="book-cover"
                    />
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            {book.author}
                        </Card.Text>
                        <Button
                            as={Link}
                            variant="dark"
                            className="w-100"
                            to={"/details/" + book.id}
                        >
                            Details
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Available Books</h1>
                </Col>
            </Row>
            <Row>
                {/* books here */}
                {Books}
            </Row>
        </Container>
    )
}