import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReturnUserProperties } from './UserId';

export default function UserList() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [orderUsersBy, setOrderUsersBy] = useState('creationDate');
  const userRole = ReturnUserProperties('user_role')
  
  const User = ({ user }) => (
    <tr>
      <td><Link  to={`/users/${user._id}`}>{user.email}</Link></td>
      <td>{user.username}</td>
      <td>{user.creationDate}</td>
      <td>{user.birth_date}</td>
      <td>{user.address}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.user_role}</td>
      <td>{<Link to={`/edit_user/${user._id}`}>Edit</Link>}
      </td>
      {userRole === 'Administrator' && (
      <td>
        <button onClick={(event) => onDelete(event, user._id)}>Delete</button>
      </td>
    )}    </tr>
  );
 
  useEffect(() => {
      axios.get('https://e-commerce-model.onrender.com/users/')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => console.log(error));
    }, [id]);

  function sortByCreationDate(users, prop) {
      if (typeof prop == "number") {
      return users.sort((user1, user2) => {
        if (user1[prop] > user2[prop]) {
          return -1;
        } else if (user1[prop] < user2[prop]) {
          return 1;
        } else {
          return 0;
        }
      });}
      if (typeof prop == "string") {
        return users.sort((user1, user2) => {
          if (user1[prop] < user2[prop]) {
            return -1;
          } else if (user1[prop] > user2[prop]) {
            return 1;
          } else {
            return 0;
          }
        });}
    }
 
function changeSortingCriterion(event, sortingCriterion) {
    event.preventDefault();
    setOrderUsersBy(sortingCriterion)
  }

  function ShowUsers(x) {
    const sortedUsers = sortByCreationDate(users, x);
  
    if (!sortedUsers || sortedUsers.length === 0) {
      return null; // or display a loading spinner, error message, etc.
    }
  
    const userList = sortedUsers.map((currentUser, i) => (
      <User user={currentUser} key={i} />
    ));
  
    return userList;
  }
  
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
            <th>Email<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'email')}></button></th>
            <th>Username<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'username')}></button></th>
            <th>Registration Date<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'creation_date')}></button></th>
            <th>Birth Date<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'birth_date')}></button></th>
            <th>Address<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'address')}></button></th>
            <th>First Name<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'first_name')}></button></th>
            <th>Last Name<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'last_name')}></button></th>
          </tr>
        </thead>
        <tbody>{ShowUsers(orderUsersBy)}</tbody>
      </table>
    </div>
  );
};