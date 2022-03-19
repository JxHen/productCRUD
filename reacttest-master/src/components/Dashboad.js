import React, { useEffect, useState } from 'react';
import { Product } from './Product'
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export function Dashboard() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        try {
            const fetchData = async (page) => {
                const response = await axios.get(`http://localhost:4000/all?page=${page}`);
                setProducts(response.data);
            }
            fetchData(0);
        } catch (error) {
            console.log(error);
        }

    }, [])
    return (
        <Container>
            <Row>
                {products.map((product, key) => {
                    return <Col key={key}>
                        <Product name={product?.name} price={product?.price} quantity={product?.quantity} id={product?.idproduct} />
                    </Col>
                })}
            </Row>
        </Container>
    );
}