import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CreatePost from '../posts/Create';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId } from '../users/UserId';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';

export function ListExhibition({ItensToShow, quantity, setQuantity, listName}) {
return (
    <div>
      <Container>
        <Row>
          {ItensToShow.map((product) => (
            <Col key={product._id}>
              <Card>
                <Card.Body>
                  <Card.Title><Link  to={`/product/${product._id}`}>{product.name}</Link></Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Form>
                {quantity && setQuantity &&
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
                    </Form.Group> }
                {listName === 'wishlist' && 
                <>
                    <AddToCartButton button="cart" productId={product._id}/>
                    <AddToCartButton button="buy_now" productId={product._id}/>
                    <AddToCartButton button="remove_from_wishlist" productId={product._id}/>
                </>
                }
                {listName === 'shopping_cart' && 
                <>
                    <AddToCartButton button="buy_now" productId={product._id}/>
                    <AddToCartButton button="remove_from_cart" productId={product._id}/>
                </>
                }
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