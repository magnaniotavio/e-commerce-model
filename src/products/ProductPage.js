import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import {returnUserData, returnUserId, returnUserName, ReturnUserProperties } from '../users/UserId';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons';
import productPic from '../images/productPic.png';

function ProductPage() {
  const userId = returnUserId()
  const {id} = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const [userReview, setUserReview] = useState({
    id: userId,
    name: '',
    content: '',
  })

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [classification, setClassification] = useState("");
  const [sizeSML, setSizeSML] = useState("");
  const [sizeNumber, setSizeNumber] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [customerReview, setCustomerReview] = useState([]);
  const [popularity, setPopularity] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [targetPublic, setTargetPublic] = useState("");

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

  const onChangeUserReview = (e) => {
    e.preventDefault()
    console.log('this is customer review' + userReview)
    setUserReview({
      ...userReview,
      content: e.target.value,
    })
  }

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://e-commerce-model.onrender.com/users/${userId}`)
        .then((res) => {
          const updatedUsername = res.data.username;
          setUserReview((prevReview) => ({
            ...prevReview,
            name: updatedUsername,
          }));
        })
        .catch((error) => console.error(error));
    }
  }, [userId]);
  

  const onSubmitUserReview = (e) => {
    e.preventDefault()
    if (userId) {

      axios.get(`https://e-commerce-model.onrender.com/users/${userId}`)
      .then((res) => {
        const updatedUsername = res.data.username;
        setUserReview((prevReview) => ({
          ...prevReview,
          name: updatedUsername,
        }))
      })
      const currentReview = [...customerReview, userReview];
      setCustomerReview(currentReview)
      axios.post(`https://e-commerce-model.onrender.com/products/update_product/${id}`, {
        customerReview: currentReview
    })  
      .then((response) => {
        setCustomerReview(response.data.customerReview);
      })
      .catch((error) => {
        console.error(error);
      });
    
      axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
        payment_info: currentReview.filter(review => review.id === userId)
      })  
      .then(
        () => window.location.reload())
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
