import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import { AuthContext } from "../../contexts/AuthContext"
import { FirestoreContext } from "../../contexts/FirestoreContext"
import { useContext, useState, useEffect } from "react"

import { collection, getDocs, updateDoc } from 'firebase/firestore'

export function ListLoans(props) {
    const [ loans, setLoans ] = useState([])

    let loaded = false

    const auth = useContext(AuthContext)
    const db = useContext(FirestoreContext)

    const getLoans = async () => {
        // get documents from loans collection
        const loansRef = collection(db, "loans")
        const snapshot = await getDocs(loansRef)
        let loans = []
        snapshot.forEach ( (loan) => {
            let item = loan.data()
            item.id = loan.id
            loans.push(item)
        })
        setLoans (loans)
        console.log(loans)
    }

    const returnBook = async (bookid) => {
        const ref = doc(db, "books", bookId)
        const update = await updateDoc(ref, {onloan: true})
    }

    useEffect( () => {
        if(!loans) {
            getLoans()
        }
    }, [loaded])
    
    const BookLoans = loans.map( (loan, key) => {
        return (
            <Row className="my-3" key={key}>
                <Col>{new Date (loan.time.seconds)}</Col>
                <Col>{loan.bookTitle}</Col>
                <Col>{loan.bookId}</Col>
                <Col>{loan.userId}</Col>
                <Col>
                <Button
                type="button"
                variant="primary"
                onCllck={() => returnBook(loan.bookId)}
                >
                    Returned
                </Button>
                </Col>
            </Row>
        )
    })

    return (
        <Container>
            <h1>List of Loans</h1>
            {BookLoans}
        </Container>
    )
}