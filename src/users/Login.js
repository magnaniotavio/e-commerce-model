
import React, { useEffect, useContext, useState } from 'react'
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from 'axios';
import Cookies from "universal-cookie";
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const cookies = new Cookies();

const token = cookies.get("TOKEN");

export default function Login() {
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState('');


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    axios
      .post('https://e-commerce-model.onrender.com/users/login', { email, password })
      .then((res) => {
        cookies.set('TOKEN', res.data.token, { path: '/' });
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        window.location.reload(); // reload the page to update the UI
      })
      .catch((error) => {
        setLoginError('Login failed. Please check your credentials.');
      });
  };

  let decoded;

  if (token) {
    decoded = jwtDecode(token);
    const userId = decoded.userEmail;
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
  } else {
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
