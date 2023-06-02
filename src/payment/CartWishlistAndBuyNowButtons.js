import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CreatePost from '../posts/Create';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId, returnUserName } from '../users/UserId';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

export function AddToCartButton({button, productId}) {
  let decoded;
  const cookies = new Cookies();   
  const token = cookies.get("TOKEN");
  decoded = jwtDecode(token);
  const userId = decoded.userId;
  const navigate = useNavigate();  
  const username = returnUserName()
  const {id} = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  const [currentWishlist, setCurrentWishlist] = useState('')
  const [currentShoppingCart, setCurrentShoppingCart] = useState('')
  const [userReview, setUserReview] = useState({
      id: userId,
      name: username,
      content: '',
    })
  const [product, setPost] = useState({
      name: '',
      color: '',
      brand: '',
      price: '',
      classification: '',
      sizeSML: '',
      sizeNumber: '',
      customerReview: [],
      popularity: '',
      condition: '',
      availability: '',
      description: '',
      creationDate: '',
      lastEdited: '',
    });
  //const [quantity, setQuantity] = useState(1);

  useEffect(() => {
        if (!token) {
          navigate("/homepage");
        } 
        else if ( !userId) {
          navigate("/homepage")
        }
        else {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      }, [navigate, token]);

      
    useEffect(() => {
      let isMounted = true;
      axios.get(`https://e-commerce-model.onrender.com/products/${id}`)
        .then(response => {
          console.log('response:', response);
          if (isMounted) {
            setPost({
              name: response.data.name,
              color: response.data.color,
              brand: response.data.brand,
              price: response.data.price,
              classification: response.data.classification,
              sizeSML: response.data.sizeSML,
              sizeNumber: response.data.sizeNumber,
              customerReview: response.data.customerReview,
              popularity: response.data.popularity,
              condition: response.data.condition,
              availability: response.data.availability,
              description: response.data.description,
              creationDate: response.data.creationDate,
              lastEdited: response.data.lastEdited
            });
          }
        })
        .catch(error => {
          console.log('error:', error);
        });
      return () => { isMounted = false };
    }, [])
   // }, [id]);
  
    useEffect(() => {
      axios.get(`https://e-commerce-model.onrender.com/users/${userId}`)
        .then(response => {
          console.log(response.data.wishlist);
          setCurrentWishlist(response.data.wishlist);
          setCurrentShoppingCart(response.data.shopping_cart)
        })
        .catch(error => console.error(error));
    }, [userId]);
   // }, []);

    const onSubmitShoppingCart = (e, productId) => {
        e.preventDefault();
        const newShoppingCart = [...currentShoppingCart, productId];
        axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
          shopping_cart: newShoppingCart
        })
          .then(navigate(`/users/shopping_cart/${userId}`)      )
          .catch(error => console.error(error));
    };


    const onSubmitWishList = (e, productId) => {
        e.preventDefault();
        const newWishList = [...currentWishlist, productId];
        console.log('hahhhahha', newWishList)
        axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
          wishlist: newWishList
        })
          .then(navigate(`/users/wishlist/${userId}`)      )
          .catch(error => console.error(error));
      }; 

      const removeFromWishlist = (e, productId) => {
        e.preventDefault();
        const updatedList = currentWishlist.filter((product) => product !== productId);
        axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
          wishlist: updatedList
        })
          .then(window.location.reload()    )
          .catch(error => console.error(error));
      }; 

      const removeFromCart = (e, productId) => {
        e.preventDefault();
        const updatedCart = currentShoppingCart.filter((product) => product !== productId);
        axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
          shopping_cart: updatedCart
        })
          .then(window.location.reload()    )
          .catch(error => console.error(error));
      }; 


    const onSubmitBuyNow = async () => {
        // Create a payment intent with the product information
        const response = await fetch("https://e-commerce-model.onrender.com/products/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            productName: product.name,
            productPrice: product.price,
            currency: "usd",
          }),
        });
        const { clientSecret } = await response.json();
        // Redirect the user to the payment page with the product and payment information
        // P.S.: "productId" below refers to the function parameter, not the body property a few lines above this one
        navigate({
          pathname: `/products/checkout_form/${productId}`,
          state: {
            product: product,
            clientSecret: clientSecret,
          },
        });
      };

      return (
        <div>
            {button === 'cart' && (
              <Button variant="primary" onClick={(e) => onSubmitShoppingCart(e, productId)}>
                Add to Cart
              </Button>
            )}
            {button === 'wishlist' && (
              <Button variant="primary" onClick={(e) => onSubmitWishList(e, productId)}>
                Add to Wishlist
              </Button>
            )}
            {button === 'buy_now' && (
              <Button variant="primary" onClick={onSubmitBuyNow}>
                Buy Now
              </Button>
            )}
            {button === 'remove_from_wishlist' && (
              <Button variant="primary" onClick={(e) => removeFromWishlist(e, productId)}>
                Remove From Wishlist
              </Button>
            )}
            {button === 'remove_from_cart' && (
              <Button variant="primary" onClick={(e) => removeFromCart(e, productId)}>
                Remove From Cart
              </Button>
            )}
        </div>
        )       
}