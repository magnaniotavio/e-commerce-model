
import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from 'axios';
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

/* In this component, we will allow the user to perform a login operation, or be redirected to registration
   in case they are not registered yet */

// Gets cookies and token
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function Login() {
  // Error message in case login fails
  const [loginError, setLoginError] = useState('');

  // Checks for the authorizing token, using jwt, in case the user is already logged-in and clicked 'login' by mistake
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Defines the emal and password according to what the user types in the respective fields
    const email = e.target.email.value;
    const password = e.target.password.value;
    // Posts the email and password
    axios
      .post('https://e-commerce-model.onrender.com/users/login', { email, password })
      .then((res) => {
        cookies.set('TOKEN', res.data.token, { path: '/' });
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        // Eeload the page 
        window.location.reload(); 
      })
      .catch((error) => {
        setLoginError('Login failed. Please check your credentials.');
      });
  };

  let decoded;

  // If the token has been found, we show a logged-in message for the user and a link for him to go to his profile
  if (token) {
    // Decodes the user data
    decoded = jwtDecode(token);
    return (
      <Container>
        <p>Your are now logged in as {decoded.userEmail}</p>
        <p>
          <Link to={`/profile/${decoded.userId}`} className="nav-link">
            Click here to go to your profile
          </Link>
        </p>
      </Container>
    );
  } 
  // Login form for the user to type his data into and make his login
  else {
    return (
      <>
        <p>Login</p>
        {loginError && <Alert variant="danger">{loginError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          Not registered yet? Click <Link to="/registration">here</Link> to register.
        </Form>
      </>
    );
  }
}
