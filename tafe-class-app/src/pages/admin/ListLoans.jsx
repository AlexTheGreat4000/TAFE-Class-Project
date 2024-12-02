import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import { AuthContext } from "../../contexts/AuthContext"
import { FirestoreContext } from "../../contexts/FirestoreContext"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import { collection, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore'

export function ListLoans(props) {
    const [ loans, setLoans ] = useState([])

    let loaded = false

    const auth = useContext(AuthContext)
    const db = useContext(FirestoreContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(props.mode == false) {
            navigate('/signin')
        }
    }, [props.mode])

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
        //console.log(loans)
    }

    const returnBook = async (bookId, loanId) => {
        const ref = doc(db, "books", bookId)
        const update = await updateDoc(ref, {onLoan: false})
        // update the book loan in "loans" collection
        const loansRef = doc(db, "loans", loanId)
        const updateLoan = await updateDoc(loansRef, {returned: serverTimestamp()})
    }

    useEffect( () => {
        if(!loaded) {
            getLoans()
        }
    }, [loaded])
    
    const BookLoans = loans.map( (loan, key) => {
        
        // loan date variables
        const loanDate = loan.time.toDate()
        const loanYear = loanDate.getFullYear()
        const loanMonth = loanDate.getMonth() + 1
        const loanDay = loanDate.getDate()
        const loanHour = loanDate.getHours()
        const loanMinute = loanDate.getMinutes()
        const loanSeconds = loanDate.getSeconds()
        const loanDateString = `${loanDay}/${loanMonth}/${loanYear} ${loanHour}:${loanMinute}:${loanSeconds}`

        return (
            <Row className="my-3" key={key}>
                <Col>{loanDateString}</Col>
                <Col>{loan.bookTitle}</Col>
                <Col>{loan.bookId}</Col>
                <Col>{loan.userId}</Col>
                <Col>
                <Button
                    type="button"
                    variant="dark"
                    onClick={() => returnBook(loan.bookId, loan.id)}
                    disabled={(loan.returned) ? true : false}
                >
                    Return
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