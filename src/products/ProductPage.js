import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CreatePost from '../posts/Create';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId, returnUserName } from '../users/UserId';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';
 
function ProductPage() {
  const userId = returnUserId()
  const username = returnUserName()
  const {id} = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const [userReview, setUserReview] = useState({
    id: userId,
    name: username,
    content: '',
  })
  const [product, setPost] = useState({
    id: '',
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

  useEffect(() => {
    let isMounted = true;
    axios.get(`http://localhost:4000/products/${id}`)
      .then(response => {
        console.log('response:', response);
        if (isMounted) {
          setPost({
            _id: response.data._id,
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
  }, [id]);

  const onChangeUserReview = (e) => {
    e.preventDefault()
    console.log('this is customer review' + userReview)
    setUserReview({
      ...userReview,
      content: e.target.value,
    })
  }

  const onSubmitUserReview = (e) => {
    e.preventDefault()
    if (userId) {
      const currentReview = [...product.customerReview];
      currentReview.push(userReview);
      axios.post(`http://localhost:4000/products/update_product/${id}`, {
        ...product,
        customerReview: currentReview
      })  
      axios.post(`http://localhost:4000/users/update_user/${userId}`, {
        payment_info: currentReview.filter(review => review.id === userId)
      })  
      .then(() => window.location.reload())
      .catch(error => console.error(error));
    }
  }

  return (
    <div>
        <Container>
      <Row>
        <Col>
        <Row>
        <Col md={6}>
        </Col>
        <Col md={6}>
          <h3><Link  to={`/product/${product._id}`}>{product.name}</Link></h3>
          <p>{product.brand}</p>
          <hr />
          <h4>Price: ${product.price}</h4>
          <button className="btn btn-primary mt-3">Add to Cart</button>
        </Col>
      </Row>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={8}>
          <h3>Description</h3>
          <p>{product.description}</p>
          <ListGroup>
            <ListGroup.Item><strong>Height:</strong> 20 inches</ListGroup.Item>
            <ListGroup.Item><strong>Width:</strong> 10 inches</ListGroup.Item>
            <ListGroup.Item><strong>Depth:</strong> 5 inches</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>

          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Price:</strong> $99.99</ListGroup.Item>
              <ListGroup.Item><strong>Availability:</strong> In Stock</ListGroup.Item>
              <ListGroup.Item><strong>Condition:</strong> New</ListGroup.Item>
            </ListGroup>
            <Card.Body>
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
                {typeof userId !== 'undefined' ? (
                        <>
                      <AddToCartButton button="cart" productId={product._id}/>
                      <AddToCartButton button="wishlist" productId={product._id}/>
                      <AddToCartButton button="buy_now" productId={product._id}/>
                      </>
                      ) : ''}
               </Form>
             </Card.Body>
           </Card>
         </Col>
       </Row>
       <Row className="my-4">
      <Col>
        <Button
          variant="outline-secondary"
          onClick={handleToggleExpand}
          aria-expanded={isExpanded}
          aria-controls="reviews-collapse"
          className="d-flex align-items-center"
        >
          <h3 className="m-0 mr-2">Customer Reviews</h3>
          {isExpanded ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
        </Button>
        <div
          className={`collapse${isExpanded ? ' show' : ''}`}
          id="reviews-collapse"
        >
          <ListGroup>
            {product.customerReview.map((review, index) => (
              <ListGroup.Item key={index}>
                <h4 className="text-left">Reviewed by: {review.name}</h4>
                <ReactMarkdown>{review.content}</ReactMarkdown>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Col>
    </Row>
    </Container>
    <Form>
            <div className="form-group">
            <label>Make your comment: </label>
            <input 
                    type="text" 
                    className="form-control"
                    value={userReview.content}
                    onChange={onChangeUserReview}
                    />
        </div>
        <Button variant="primary" onClick={onSubmitUserReview}>Post Review</Button>
    </Form>
    </div>
  );
};

export default ProductPage;
