import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { ReturnUserProperties, returnUserId } from '../users/UserId';
import { useParams } from 'react-router-dom';

const cookies = new Cookies();

// Checks for any logged-in user
export function CheckForToken() {
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      const token = cookies.get("TOKEN");
      const decodedToken = jwtDecode(token);
      // Process the decoded token as needed
    } catch (error) {
      // Handle the invalid token error, e.g., redirect the user
      navigate('/unauthorized');
    }
  }, []);

  return null;
}

// Checks whether the user is Administrator
export function CheckForUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = cookies.get("TOKEN");
  let decoded;
  decoded = null;
  if (typeof token === 'string') {
    decoded = jwtDecode(token);
  }
  const userId = decoded ? returnUserId() : null;
  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
    } 
    else if (id != userId) {
      navigate("/unauthorized")
    }
    else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [navigate, token]);
}

/* Checks whether the user has the same Id as the one retrieved by the token,
   this is so that, e.g., only a user can see their own profile when they set it to private, etc. */
   export function CheckForUserRole(role) {
    const navigate = useNavigate();
    const token = cookies.get("TOKEN");
    const decoded = jwtDecode(token);
    console.log('this' + JSON.stringify(decoded));
  
    if (decoded.userRole !== role) {
      navigate("/unauthorized")
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }