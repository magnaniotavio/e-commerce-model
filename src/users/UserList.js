import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReturnUserProperties } from './UserId';
import { CheckForUserRole } from '../basicComponents/CheckForToken';
import { changeSortingCriterion, shownDataList} from '../basicComponents/OrderingListedObjects';

/* This is a very basic presentation of the users, which will be accessible to the Administrator.
   In this list, the Admin can see the basic properties of each user, as well as delete them.
*/

export default function UserList() {

  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [sortingCriterion, setSortingCriterion] = useState('creationDate');
  const userRole = ReturnUserProperties('user_role')

  // JSX table with the returned list of users and their properties
  const User = ({ data }) => (
    <tr>
      <td><Link  to={`/users/${data._id}`}>{data.email}</Link></td>
      <td>{data.username}</td>
      <td>{data.creationDate}</td>
      <td>{data.birth_date}</td>
      <td>{data.address}</td>
      <td>{data.first_name}</td>
      <td>{data.last_name}</td>
      <td>{data.user_role}</td>
      <td>{<Link to={`/edit_user/${data._id}`}>Edit</Link>}
      </td>
      {userRole === 'Administrator' && (
      <td>
        <button onClick={(event) => onDelete(event, data._id)}>Delete</button>
      </td>
    )}    </tr>
  );
 
  CheckForUserRole('Administrator') // Checks if the user is an Admin

  // Gets the users
  useEffect(() => {
      axios.get('https://e-commerce-model.onrender.com/users/')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => console.log(error));
    }, [id]);
  
// Deletes posts
function onDelete(event, parameter) {
    event.preventDefault()
    axios
      .delete(`https://e-commerce-model.onrender.com/users/delete_user/${parameter}`)
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
      <h3>User List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Email<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'email', setSortingCriterion)}></button></th>
            <th>Username<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'username', setSortingCriterion)}></button></th>
            <th>Registration Date<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'creation_date', setSortingCriterion)}></button></th>
            <th>Birth Date<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'birth_date',setSortingCriterion)}></button></th>
            <th>Address<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'address',setSortingCriterion)}></button></th>
            <th>First Name<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'first_name',setSortingCriterion)}></button></th>
            <th>Last Name<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'last_name',setSortingCriterion)}></button></th>
          </tr>
        </thead>
        <tbody>{shownDataList(sortingCriterion, users, User)}</tbody>
      </table>
    </div>
  );
};