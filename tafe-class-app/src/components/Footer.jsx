import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export function Footer(props) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <p className="text-center pt-4">Copyright 2024 © Australia University Library. Website made by Gelos Enterprises</p>
                </Col>
            </Row>
        </Container>
    )
}