import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { returnUserId } from '../users/UserId';
import { ListExhibition } from '../products/CartAndWishlistPresentation';

// Gets the itens in the user's wishlist and shows them
export default function Wishlist() {
  const userId = returnUserId()
  const {id} = useParams();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Gets the wishlist itens of the User
    axios.get(`https://e-commerce-model.onrender.com/users/${userId}`)
      .then(response => {
        const userWishlistIds = response.data.wishlist;
        // Filters the products according to the Ids found in the user's wishlist
        axios.get(`https://e-commerce-model.onrender.com/products/`)
          .then(response => {
            const filteredProducts = response.data.filter(
              product => userWishlistIds.includes(product._id)
            );
            setProducts(filteredProducts);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
    < ListExhibition ItensToShow={products} quantity={quantity} setQuantity={setQuantity} listName='wishlist'
/> 
  )
 }
































