import React, { useEffect, useContext, useState } from 'react'
import { Form, Button, Container } from "react-bootstrap";
import axios from 'axios';
import Cookies from "universal-cookie";
import { Link, unstable_usePrompt, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export function returnUserData(userData) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  let decoded;
  
  if (token) {
    decoded = jwtDecode(token);
    console.log(decoded)
    return decoded[userData]}    
}

export function ReturnUserProperties(userProperty) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const [foundProperty, setFoundProperty] = useState('')
  if (token) {
  let decoded;
  decoded = jwtDecode(token);
  const userId = decoded.userId;
    axios.get(`https://e-commerce-model.onrender.com/users/${userId}`)
        .then((response) => {
          setFoundProperty(response.data[userProperty]);})
         .catch((error) => {
          console.log(error);
        });
   // const userRole = decoded.user_role;
  return foundProperty
  }
}

export function returnUserId() {
const cookies = new Cookies();
const token = cookies.get("TOKEN");
let decoded;

if (token) {
  decoded = jwtDecode(token);
  const userId = decoded.userId;
  return userId
}
}

export function returnUserName() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  let decoded;

  if (token) {
    decoded = jwtDecode(token);
    const userId = decoded.userId;
    const username = decoded.userName;
    return username
    }
  }

  