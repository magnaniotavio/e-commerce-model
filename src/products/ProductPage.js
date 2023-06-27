import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId, returnUserName, ReturnUserProperties } from '../users/UserId';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons';
import productPic from '../images/productPic.png';

/* This component shows the default presentation of a product once you click on it,
   including a product picture, its name, price, the buttons to buy it or add to wishlist,
   as well as the customer's reviews and an input form by which you can add your own review. */
function ProductPage() {
  const userId = returnUserId()
  const {id} = useParams();
  const navigate = useNavigate();
  // Defining the properties which will be shown in the ' Customer's Reviews ' section of the page
  const [userReview, setUserReview] = useState({
    id: userId,
    name: '',
    content: '',
  })
  // By default, reviews won't be shown; the user can click to expand if they wish to see them
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

 // Defining the properties of the product
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [classification, setClassification] = useState("");
  const [sizeSML, setSizeSML] = useState("");
  const [sizeNumber, setSizeNumber] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [customerReview, setCustomerReview] = useState([]); // This array will receive a new item if the user posts a review
  const [popularity, setPopularity] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [targetPublic, setTargetPublic] = useState("");

  // Gets the products by Id, employing useParams(), and sets the constants above according to the response data
  useEffect(() => {
    let isMounted = true;
    axios.get(`https://e-commerce-model.onrender.com/products/${id}`)
      .then(response => {
        console.log('response:', response);
        if (isMounted) {
          setProductId(response.data._id);
          setName(response.data.name);
          setColor(response.data.color);
          setBrand(response.data.brand);
          setPrice(response.data.price);
          setClassification(response.data.classification);
          setSizeSML(response.data.sizeSML);
          setSizeNumber(response.data.sizeNumber);
          setCustomerReview(response.data.customerReview); 
          setPopularity(response.data.popularity);
          setCondition(response.data.condition);
          setAvailability(response.data.availability);
          setDescription(response.data.description);
          setCreationDate(response.data.creationDate);
          setTargetPublic(response.data.targetPublic);
      }      })
      .catch(error => {
        console.log('error:', error);
      });
    return () => { isMounted = false };
  }, [id]);

  // The following three  perform the logic for allowing the user to post reviews

  // Sets the content property of userReview according to text input
  const onChangeUserReview = (e) => {
    e.preventDefault()
    setUserReview({
      ...userReview,
      content: e.target.value,
    })
  }

  // Sets the username property of userReview according to retrieved username property, using the userId constant
  useEffect(() => {
    if (userId) {
      axios
        .get(`https://e-commerce-model.onrender.com/users/${userId}`)
        .then((res) => {
          // Retrieves the username
          const retrievedUsername = res.data.username;
          setUserReview((prevReview) => ({
            ...prevReview,
            name: retrievedUsername,
          }));
        })
        .catch((error) => console.error(error));
    }
  }, [userId]); 
  
  /* Two tasks are perfomed here:
     First, we update the CustomerReviews property of the product,
     Secondly, we update the ReviewsMade propety of the user. */
  const onSubmitUserReview = (e) => {
    e.preventDefault()
    if (userId) {
      // Creates a new array consisting of customerReview, plus userReview, and sets it as customerReview
      const updatedReview = [...customerReview, userReview];  
     // Updates the CustomerReviews property of the product
      axios.post(`https://e-commerce-model.onrender.com/products/update_product/${id}`, {
        customerReview: updatedReview
    })  
      .catch((error) => {
        console.error(error);
      });
      // Updates the ReviewsMade propety of the user
      axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
        payment_info: updatedReview.filter(review => review.id === userId)
      })  
      // Reloads the page so that the new review is shown
      .then(
        () => 
        window.location.reload())
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
        <Image src={productPic} />
        </Col>
        <Col md={6}>
          <h3><Link  to={`/product/${productId}`}>{name}</Link></h3>
          <p>{brand}</p>
          <hr />
          <h4>Price: ${price}</h4>
        </Col>
      </Row>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={8}>
          <h3>Description</h3>
          <p>{description}</p>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Price:</strong>{price}</ListGroup.Item>
              <ListGroup.Item><strong>Availability:</strong> {availability}</ListGroup.Item>
              <ListGroup.Item><strong>Condition:</strong> {condition}</ListGroup.Item>
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
                     <TypicalButtonPresentation prop={productId} />
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
            {customerReview.map((review, index) => (
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
        <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} onClick={onSubmitUserReview}>Post Review</Button>
    </Form>
    </div>
  );
};

export default ProductPage;
