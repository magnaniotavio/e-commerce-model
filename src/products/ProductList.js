import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReturnUserProperties } from '../users/UserId';
import { CheckForUserRole } from '../basicComponents/CheckForToken';
import { changeSortingCriterion, shownDataList} from '../basicComponents/OrderingListedObjects';

/* This is a very basic presentation of the products, which will be accessible to the Administrator.
   In this list, the Admin can see the basic properties of each product, as well as delete them.
*/

export default function ProductsList() {

  const [products, setProducts] = useState([]);
  const [sortingCriterion, setSortingCriterion] = useState('creationDate');
  const userRole = ReturnUserProperties('user_role')

  // JSX table with the returned list of products and their properties
  const Product = ({ data }) => (
    <tr>
      <td><Link  to={`/product/${data._id}`}>{data.name}</Link></td>
      <td>{data.brand}</td>
      <td>{data.price}</td>
      <td>{data.creationDate}</td>
      <td>{data.color}</td>
      <td>{data.sizeSML}</td>
      <td>{data.sizeNumber}</td>
      <td>{data.classification}</td>
      <td>{data.customerReview.content}</td>
      <td>{data.popularity}</td>
      <td>{data.targetPublic}</td>
      <td>
        {<Link to={`/edit_product/${data._id}`}>Edit</Link>}
        {userRole === 'Administrator' && (
      <td>
        <button onClick={(event) => onDelete(event, data._id)}>Delete</button>
      </td>
    )}
      </td>
    </tr>
  );
 
  CheckForUserRole('Administrator') // Checks if the user is an Admin

  // Gets the products
  useEffect(() => {
      axios.get('https://e-commerce-model.onrender.com/products/')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => console.log(error));
    }, []);
  
  // Deletes posts
  function onDelete(event, parameter) {
    event.preventDefault()
    axios
      .delete(`https://e-commerce-model.onrender.com/users/delete_product/${parameter}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
           })
      .catch((error) => {
        console.log(error);
      });
  };

return (
    <div>
      <h3>Products List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'name', setSortingCriterion)}></button></th>
            <th>Brand<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'brand', setSortingCriterion)}></button></th>
            <th>Price<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'price', setSortingCriterion)}></button></th>
            <th>Creation<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'creationDate', setSortingCriterion)}></button></th>
            <th>Color<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'color', setSortingCriterion)}></button></th>
            <th>SizeSML<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'sizeSML', setSortingCriterion)}></button></th>
            <th>Size Number<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'sizeNumber', setSortingCriterion)}></button></th>
            <th>Classification<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'classification', setSortingCriterion)}></button></th>
            <th>Customer Review<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'customerReview', setSortingCriterion)}></button></th>
            <th>Popularity<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'popularity', setSortingCriterion)}></button></th>
            <th>Public<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'targetPublic', setSortingCriterion)}></button></th>
          </tr>
        </thead>
        <tbody>
          {shownDataList(sortingCriterion, products, Product)}
       </tbody>
      </table>
    </div>
  );
};
