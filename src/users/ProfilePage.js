import React, { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { returnUserId } from "./UserId";

const cookies = new Cookies();

function Profile() {
  const userId = returnUserId()
  const token = cookies.get('TOKEN');
  const [user, setUser] = useState("");
  const {id} = useParams()
  
  useEffect(() => {
    if (!token) {
      return <div>Please log in to view this page.</div>;
    }
    axios
      .get(`http://localhost:4000/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2>User Profile</h2>
        </Col>
        <Col className="text-end">
          <Link to={`/edit_profile/${user._id}`} className="text-decoration-none">Edit Profile</Link>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={4}>
          <Image src={'https://st3.depositphotos.com/7486768/17806/v/450/depositphotos_178065822-stock-illustration-profile-anonymous-face-icon-gray.jpg'} roundedCircle fluid />
        </Col>
        <Col md={8}>
          <h3>{user.username}</h3>
          <p>{user.description}</p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Birth Date:</strong> {new Date(user.birth_date).toLocaleDateString()}</p>
          <p><strong>Language Preferences:</strong> {user.language_preferences}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </Col>
        <Col md={6}>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Newsletter Subscription:</strong> {user.newsletter_subscription ? 'Yes' : 'No'}</p>
          <p><strong>Last Login:</strong> {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}</p>
          <p><strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-end">
          <Button variant="outline-primary" ><Link to={`/users/wishlist/${userId}`}>View Wishlist</Link></Button>
          <Button variant="outline-primary" ><Link to={`/users/shopping_cart/${userId}`}>View Cart</Link></Button>
          <Button variant="outline-primary" ><Link to={`/your_orders/${userId}`}>Your Orders</Link></Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Profile;
