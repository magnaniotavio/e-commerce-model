import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductsList() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orderProductsBy, setOrderProductsBy] = useState('creationDate');

  
  const Product = ({ product }) => (
    <tr>
      <td><Link  to={`/product/${product._id}`}>{product.name}</Link></td>
      <td>{product.brand}</td>
      <td>{product.price}</td>
      <td>{product.creationDate}</td>
      <td>{product.color}</td>
      <td>{product.sizeSML}</td>
      <td>{product.sizeNumber}</td>
      <td>{product.classification}</td>
      <td>{product.customerReview.content}</td>
      <td>{product.popularity}</td>
      <td>{product.targetPublic}</td>
      <td>
        {<Link to={`/edit_product/${product._id}`}>Edit</Link>}
      </td>
    </tr>
  );
 
  useEffect(() => {
      axios.get('http://localhost:4000/products/')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => console.log(error));
    }, []);
  
    console.log('this is products' + products)

  function sortByCreationDate(products, prop) {
      if (typeof prop == "number") {
      return products.sort((product1, product2) => {
        if (product1[prop] > product2[prop]) {
          return -1;
        } else if (product1[prop] < product2[prop]) {
          return 1;
        } else {
          return 0;
        }
      });}
      if (typeof prop == "string") {
        return products.sort((product1, product2) => {
          if (product1[prop] < product2[prop]) {
            return -1;
          } else if (product1[prop] > product2[prop]) {
            return 1;
          } else {
            return 0;
          }
        });}
    }
 
  function changeSortingCriterion(event, sortingCriterion) {
    event.preventDefault();
    setOrderProductsBy(sortingCriterion)
  }

  function theProducts(x) {

  const sortedProducts = sortByCreationDate(products, x);

  console.log(sortedProducts)
  const productsList = sortedProducts.map((currentProduct, i) => (
    <Product product={currentProduct} key={i} />
  ));
  return productsList
  }

return (
    <div>
      <h3>Products List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'name')}></button></th>
            <th>Brand<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'brand')}></button></th>
            <th>Price<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'price')}></button></th>
            <th>Creation<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'creationDate')}></button></th>
            <th>Color<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'color')}></button></th>
            <th>SizeSML<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'sizeSML')}></button></th>
            <th>Size Number<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'sizeNumber')}></button></th>
            <th>Classification<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'classification')}></button></th>
            <th>Customer Review<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'customerReview')}></button></th>
            <th>Popularity<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'popularity')}></button></th>
            <th>Public<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'targetPublic')}></button></th>
          </tr>
        </thead>
        <tbody>{theProducts(orderProductsBy)}</tbody>
      </table>
    </div>
  );
};
