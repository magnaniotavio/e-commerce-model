import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReturnUserProperties } from '../users/UserId';
import { CheckForUserRole } from '../basicComponents/CheckForToken';
import { changeSortingCriterion, shownDataList } from '../basicComponents/OrderingListedObjects';

/* This is a very basic presentation of the posts, which will be accessible to the Administrator.
   In this list, the Admin can see the basic properties of each posts, as well as delete them.
*/

export default function List() {

  const [posts, setPosts] = useState([]);
  const userRole = ReturnUserProperties('user_role')
  const [sortingCriterion, setSortingCriterion] = useState('creationDate')

  // JSX table with the returned list of posts and their properties
  const Post = ({ data }) => (
    <tr>
      <td><Link to={`/${data.classification}/${data.title}/${data._id}`}>{data.title}</Link></td>
      <td>{data.content}</td>
      <td>{data.classification}</td>
      <td>{data.creation_date}</td>
      <td>{data.last_edited}</td>
      <td>{data.author}</td>
      <td>{data.language}</td>
      <td>
        {<Link to={`/edit/${data._id}`}>Edit</Link>}
      </td>
      {userRole === 'Administrator' && (
      <td>
        <button onClick={(event) => onDelete(event, data._id)}>Delete</button>
      </td>
    )} 
    </tr>
  );
 
  CheckForUserRole('Administrator') // Checks if the user is an Admin

  // Gets the posts
  useEffect(() => {
      axios.get('https://e-commerce-model.onrender.com/posts/')
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => console.log(error));
    }, []);

  // Deletes posts
  function onDelete(event, parameter) {
    event.preventDefault()
    axios
      .delete(`https://e-commerce-model.onrender.com/posts/delete/${parameter}`)
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
      <h3>Post List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'title', setSortingCriterion)}></button></th>
            <th>Content<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'content', setSortingCriterion)}></button></th>
            <th>Classification<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'classification', setSortingCriterion)}></button></th>
            <th>Author<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'creation_date', setSortingCriterion)}></button></th>
            <th>Edited<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'last_edited', setSortingCriterion)}></button></th>
            <th>Creation<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'author', setSortingCriterion)}></button></th>
          </tr>
        </thead>
        <tbody>{shownDataList(sortingCriterion, posts, Post)}</tbody>
      </table>
      <div>
    </div>
    </div>
  );
};

