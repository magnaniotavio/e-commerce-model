import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { returnUserId } from '../users/UserId';

// Shows the purchases made by the logged in user
export default function UserOrders() {
  const userId = returnUserId()
  const {id} = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://e-commerce-model.onrender.com/users/${userId}`) // Gets the user data
      .then(response => {
        const userOrdersIds = response.data.order_history; // Creates a constant with the Ids found in the user object's order_history property
        axios.get(`https://e-commerce-model.onrender.com/products/`)
          .then(response => {
            setProducts(userOrdersIds); // Sets the products according to userOrderIds
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, [id]);

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
