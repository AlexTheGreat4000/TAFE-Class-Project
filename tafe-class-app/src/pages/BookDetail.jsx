import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { FirestoreContext } from "../contexts/FirestoreContext"
import { addDoc, doc, getDoc, updateDoc, collection, serverTimestamp } from "firebase/firestore"
import { AuthContext } from "../contexts/AuthContext"

export function BookDetail(props) {
    const [book, setBook] = useState()
    const [signedIn, setSignedIn] = useState(false)
    const [borrowed, setBorrowed] = useState(false)

    const params = useParams()
    const db = useContext(FirestoreContext)

    const auth = useContext(AuthContext)

    useEffect(() => {
        if (auth) {
            setSignedIn(true)
        }
        else {
            setSignedIn(false)
        }
    }, [auth])

    // function to get book data
    const getBookDetails = async () => {
        const ref = doc(db, "books", params.bookId)
        const details = await getDoc(ref)
        let bookObject = details.data()
        bookObject.id = details.id
        if (bookObject.onLoan) {
            setBorrowed(true)
        }
        setBook(bookObject)
    }

    // function to borrow a book
    const borrowBook = async () => {
        const ref = doc(db, "books", book.id)
        const update = await updateDoc(ref, { onLoan: true })
        // let tempbook = book
        // tempbook.onLoan = true
        // setBook(tempbook)
        setBorrowed(true)
        // record who borrowed the book and when
        // console.log(auth.uid, new Date().getTime())
        const loanRecord = await addDoc(
            collection (db, "loans"),
            {
                bookId: book.id,
                bookTitle: book.title,
                userId: auth.uid,
                time: serverTimestamp()
            }
        )
        console.log(loanRecord.id)
    }

    const BorrowButton = (props) => {
        if (signedIn) {
            return (
                <Button
                    type="button"
                    variant="dark"
                    onClick={() => borrowBook()}
                    disabled={(borrowed) ? true : false}
                >
                    {(borrowed) ? "This Book Is On Loan" : "Borrow This Book"}
                </Button>
            )
        }
        else {
            return null
        }
    }

    useEffect(() => {
        if (!book) {
            getBookDetails()
        }
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
                        <img width="500" height="700" src={book.cover} />
                    </Col>
                    <Col md={6}>
                        <h4><b>Author:</b> {book.author}</h4>
                        <h4><b>Publisher:</b> {book.publisher}</h4>
                        <h4><b>ISBN:</b> {book.isbnOld}, {book.isbnNew}</h4>
                        <h4><b>Year Published:</b> {book.yearPublished}</h4>
                        <h4><b>Pages:</b> {book.pages}</h4>
                        <h4><b>Language:</b> {book.language}</h4>
                        <h4><b>Genre:</b> {book.genre}</h4>
                        <h4><b>Description:</b></h4>
                        <p>{book.description}</p>
                        <BorrowButton />
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
}