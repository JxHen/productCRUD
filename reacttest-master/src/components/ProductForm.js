import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import axios from 'axios';

export function ProductForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [show, setShow] = useState(false);
    let params = useParams();

    useEffect(() => {
        if (params.productId) {
            try {
                const fetchData = async (page) => {
                    const response = await axios.get(`http://localhost:4000/product?id=${params.productId}`);
                    setName(response.data.name);
                    setPrice(response.data.price);
                    setQuantity(response.data.quantity);
                }
                fetchData(0);
            } catch (error) {
                console.log(error);
            }
        }

    }, [])
    const sendData = async (event) => {
        event.preventDefault();
        let url = "";
        let payload = {}

        if (params.productId) {
            url = "http://localhost:4000/update"
            payload = {
                name: name,
                price: price,
                quantity: quantity,
                id: params.productId
            };
        } else {
            url = "http://localhost:4000/new"
            payload = {
                name: name,
                price: price,
                quantity: quantity
            };
        }
        try {
            const options = {
                headers: { "content-type": "application/json" }
            }
            const response = await axios.post(url, payload, options);
            setShow(true)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteData = async (event) => {
        event.preventDefault();

        try {
            const options = {
                headers: { "content-type": "application/json" }
            }
            const response = await axios.post("http://localhost:4000/delete", { id: params.productId }, options);
            window.location.assign("/")
        } catch (error) {
            console.log(error);
        }
    }
    const updateName = (event) => {
        setName(event.target.value);
    }
    const updatePrice = (event) => {
        setPrice(event.target.value);
    }
    const updateQuantity = (event) => {
        setQuantity(event.target.value);
    }

    return (
        <Container>
            <Form>
                <Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" onChange={updateName} value={name} />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" onChange={updatePrice} value={price} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Enter quantity" onChange={updateQuantity} value={quantity} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" onClick={sendData}>
                    Submit
                </Button>
                <Button variant="danger" type="submit" onClick={deleteData}>
                    Delete
                </Button>
            </Form>
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Update</strong>
                    </Toast.Header>
                    <Toast.Body>Woohoo, your product was updated</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}
