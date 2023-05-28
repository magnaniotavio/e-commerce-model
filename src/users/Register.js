import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [language_preferences, setLanguagePreferences] = useState("");
  const [timezone, setTimezone] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [payment_info, setPaymentInfo] = useState([]);
  const [newsletter_subscription, setNewsletterSubscription] = useState(false);
  const [verified, setVerified] = useState(false);
  const [last_login, setLastLogin] = useState(null);
  const [birth_date, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    notAnEmail: 'The adress you typed does not correspond to an email.',
    takenEmail: 'That email is already taken',
    notAnUsername: 'Your username should include only words',
    takenUsername: 'That username has already being taken',
  });
  
  const navigate = useNavigate()
  
  const newUser = {
    username,
    email,
    password,
    description,
    profile_picture,
    language_preferences,
    timezone,
    wishlist,
    payment_info,
    newsletter_subscription,
    verified,
    last_login,
    birth_date,
    address,
    first_name,
    last_name,
    phone_number,
  };  

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/users/register', newUser)
        .then(res => {
          console.log(res.data)
          setRegister(true);
          const userId = res.data.result._id; // get the user's ID from the response
          navigate(`/login`); // redirect to the profile page with the ID
            })
        .catch(error => console.log(error));   
          };   
 
if (register === false) {
    return (
        <>
                  <h2>Register</h2>
                  <Form onSubmit={(e)=>handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username address</Form.Label>
          <Form.Control
            type="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your_email@email_provider.com"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
      </Form>
        </>
    )}
}