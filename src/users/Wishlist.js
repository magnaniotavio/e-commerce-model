import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CreatePost from '../posts/Create';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId } from '../users/UserId';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';
import { ListExhibition } from '../products/ListExhibition';

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

  console.log(products)
  return (
    < ListExhibition ItensToShow={products} quantity={quantity} setQuantity={setQuantity} listName='wishlist'
/> 
  )
 }
































