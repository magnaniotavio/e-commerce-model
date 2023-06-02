import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { returnUserId } from '../users/UserId';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import jwtDecode from 'jwt-decode';

let decoded;
const cookies = new Cookies();   
const stripePromise = loadStripe('pk_test_51N6tO8EFMUty2Z9O0hadXLSAFUfCFaIWnTNZACAAS1XQTXZBrkGU9bHyHCj3jcMxUbobDet4S0lVtziZWsTQYUge00s53cZ5Eu');

export default function CheckoutForm() {
  const token = cookies.get("TOKEN");
  const navigate = useNavigate();
  decoded = jwtDecode(token);
  const userId = decoded.userId;
  console.log(decoded)
  const {id} = useParams();
  // Client Secret which is going to be used by Stripe in the payment process
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const currentDate = new Date();
  const [price, setPrice] = useState('');  
  const [product, setProduct] = useState('');        
  const [order, setOrder] = useState({
    productId: '',
    buyer: userId,
    product_name: product,
    date: currentDate,
    address: '',
    price: '',
  })
  const [currentOrderHistory, setCurrentOrderHistory] = useState([]);
  const options = {
    clientSecret: clientSecret,
  };

// Verifies if there is a logged-in user user
  useEffect(() => {
    if (!token) {
      navigate("/homepage");
    } 
    else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [navigate, token]);

// Gets the product Id by applying useParams(), then updates the constants using the response data
  useEffect(() => {
    axios.get(`https://e-commerce-model.onrender.com/products/${id}`)
      .then(response => {
        setPrice(response.data.price);
        setProduct(response.data.name);
        setOrder({
          ...order, 
          productId: (response.data._id),
          product_name: (response.data.name),
          price: (response.data.price)
        });        
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

// Gets the order history of the logged-in user, and updates the constant using the response data
    useEffect(() => {
    axios.get(`https://e-commerce-model.onrender.com/users/${userId}`)
      .then(response => {
        setCurrentOrderHistory(response.data.order_history);
      })
      .catch(error => console.error(error));
  }, [userId]); 
      
 // Creates a payment intend, posts the price to it, and gets the ClientSecret from the response data
  useEffect(() => {
    axios.post('https://e-commerce-model.onrender.com/products/create-payment-intent', {
      price
    })
      .then(response => {
        setClientSecret(response.data.clientSecret);
      })
      .catch(error => {
        console.error(error);
      });
  }, [price]);


  const handleClick = async () => {
    if (!elements || !stripe || !clientSecret) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    if (result.error) {
      console.error(result.error);
    } else if (userId)  {
      console.log('Payment successful!');
      axios.post('https://e-commerce-model.onrender.com/purchases/add_orders', order)
      .then(response => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        // Handle the error if needed
        console.error(error);
      });
      const newOrderHistory = [...currentOrderHistory];
      newOrderHistory.push(order);
          axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
        order_history: newOrderHistory
      })
        .then(
          navigate(`/users/wishlist/${userId}`)      )
        .catch(error => console.error(error));   
      navigate('/products/payment_succesful/') 
    }
  };

  return (
    <div>
      <h2>{product}</h2>
      <h3>${price}</h3>
        <CardElement />
      <button onClick={handleClick} disabled={!clientSecret}>
        Buy Now
      </button>
    </div>
  );
}
