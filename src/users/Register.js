import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { emailInput, passwordInput, textInput } from '../basicComponents/JSXFunctions';

export default function Register() {
  // Registration is set to false by default; once it's set to true, the user will be asked to make his log-in
  const [register, setRegister] = useState(false);
  // Below are the user properties, following the Mongoose model
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
  
  const navigate = useNavigate()
  
  // Creates newUser object, containing the constants above
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
        // Posts the newUser object
        axios.post(`https://e-commerce-model.onrender.com/users/register`, newUser)
        .then(res => {
          // Sets Register to true
          setRegister(true);
            })
        .catch(error => console.log(error));   
          };   

// Shows registration formulary when register is false
if (register === false) {
    return (
        <>
        <h2>Register</h2>
        <Form onSubmit={(e)=>handleSubmit(e)}>
          {textInput('Username address', username, setUsername)}
          {emailInput('Email address', email, setEmail)}
          {passwordInput('Password', password, setPassword)}
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
// Asks the user to make log in once registration is set to true
else if (register === true) {
  navigate(`/login`); // redirect to the profile page with the ID
}
} 
