import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CreatePost from '../posts/Create';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId } from '../users/UserId';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';

export default function Wishlist() {
  const navigate = useNavigate()
  const userId = returnUserId()
  const {id} = useParams();
  const [products, setProducts] = useState([]);
  const [currentWishList, setCurrentWishlist] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://e-commerce-model.onrender.com/users/${userId}`)
      .then(response => {
        const setCurrentWishlist = response.data.wishlist;
        const userWishlistIds = response.data.wishlist;
        console.log(response.data.wishlist);
        axios.get(`https://e-commerce-model.onrender.com/products/`)
          .then(response => {
            const filteredProducts = response.data.filter(
              product => userWishlistIds.includes(product._id)
            );
            setProducts(filteredProducts);
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
                  <Card.Title><Link  to={`/product/${product._id}`}>{product.name}</Link></Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Form>
                    <Form.Group>
                    <Form.Control as="select" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                    <Form.Label>Select Quantity:</Form.Label>
                      <Form.Label>Select Quantity:</Form.Label>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </Form.Control>
                    </Form.Group>
                    <AddToCartButton button="cart" productId={product._id}/>
                    <AddToCartButton button="buy_now" productId={product._id}/>
                    <AddToCartButton button="remove_from_wishlist" productId={product._id}/>
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
































