import React from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';

export function Product(props) {
    const { id, name, price, quantity } = props;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://picsum.photos/200" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <Row>
                        <Col>
                            <p>price </p> <Badge bg="secondary">{quantity}</Badge>
                        </Col>
                        <Col>
                            <p>Quantity </p> <Badge bg="danger">{price}</Badge>
                        </Col>
                    </Row>
                </Card.Text>
                <Button variant="primary" href={`/view/${id}`} >View Details</Button>
            </Card.Body>
        </Card >
    );

}