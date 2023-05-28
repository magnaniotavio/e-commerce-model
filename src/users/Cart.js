import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CreatePost from '../posts/Create';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId } from '../users/UserId';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';
// CHECK FOR DELETION BY LOOKING IF THE ID'S STILL MATCH WHAT EXISTS IN THE PRODUCTS DATABASE


export default function ShoppingCart() {
  const userId = returnUserId()
  const {id} = useParams();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(2);

  useEffect(() => {
    axios.get(`http://localhost:4000/users/${userId}`)
      .then(response => {
        const userShoppingCartIds = response.data.shopping_cart;
        console.log(response.data.shopping_cart);
        axios.get(`http://localhost:4000/products/`)
          .then(response => {
            const filteredProducts = response.data.filter(
              product => userShoppingCartIds.includes(product._id)
            );
            setProducts(filteredProducts);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, [id]);

  console.log(quantity)
  console.log(products)
  return (
    <div>
      <Container>
        <Row>
          {products.map((product) => (
            <Col key={product._id}>
              <Card>
                <Card.Body>
                  <Card.Title><Link  to={`/product/${product._id}`}>{product.name}</Link></Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Form>
                    <Form.Group>
                      <Form.Label>Select Quantity:</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                    <AddToCartButton button="buy_now" productId={product._id}/>
                    <AddToCartButton button="remove_from_cart" productId={product._id}/>
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