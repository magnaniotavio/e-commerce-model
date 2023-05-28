import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CreatePost from '../posts/Create';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId } from '../users/UserId';

export default function UserOrders() {
  const navigate = useNavigate()
  const userId = returnUserId()
  const {id} = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/users/${userId}`)
      .then(response => {
        const userOrdersIds = response.data.order_history;
        console.log(response.data.order_history);
        axios.get(`http://localhost:4000/products/`)
          .then(response => {
            setProducts(userOrdersIds);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, [id]);

  console.log(products)
  return (
    <div>
      <Container>
        <Row>
          {products.map((product) => (
            <Col key={product._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{product.product_name}</Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Card.Text>Ordered in: {new Date(product.date).toLocaleDateString()}</Card.Text>
                  <Form>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>

  );
}
