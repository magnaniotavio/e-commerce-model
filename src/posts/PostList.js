import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostPage from './PostPage';
import { Button } from 'react-bootstrap';
import { ReturnUserProperties } from '../users/UserId';
import { CheckForUserRole } from '../basicComponents/CheckForToken';
export default function List() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const userRole = ReturnUserProperties('user_role')

  const Post = ({ post }) => (
    <tr>
      <td><Link to={`/${post.classification}/${post.title}/${post._id}`}>{post.title}</Link></td>
      <td>{post.content}</td>
      <td>{post.classification}</td>
      <td>{post.creation_date}</td>
      <td>{post.last_edited}</td>
      <td>{post.content}</td>
      <td>{post.language}</td>
      <td>
        {<Link to={`/edit/${post._id}`}>Edit</Link>}
      </td>
      {userRole === 'Administrator' && (
      <td>
        <button onClick={(event) => onDelete(event, post._id)}>Delete</button>
      </td>
    )} 
    </tr>
  );
 
  CheckForUserRole('Administrator')

   const [orderPostsBy, setOrderPostsBy] = useState('creationDate')


  useEffect(() => {
      axios.get('https://e-commerce-model.onrender.com/posts/')
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => console.log(error));
    }, []);
  
  function sortByCreationDate(posts, prop) {
      if (typeof prop == "number") {
      return posts.sort((post1, post2) => {
        if (post1[prop] > post2[prop]) {
          return -1;
        } else if (post1[prop] < post2[prop]) {
          return 1;
        } else {
          return 0;
        }
      });}
      if (typeof prop == "string") {
        return posts.sort((post1, post2) => {
          if (post1[prop] < post2[prop]) {
            return -1;
          } else if (post1[prop] > post2[prop]) {
            return 1;
          } else {
            return 0;
          }
        });}
    }
  
  function changeSortingCriterion(event, sortingCriterion) {
    event.preventDefault();
    setOrderPostsBy(sortingCriterion)
  }

  function thePosts(x) {

  const sortedPosts = sortByCreationDate(posts, x);

  console.log(sortedPosts)
  const postList = sortedPosts.map((currentPost, i) => (
    <Post post={currentPost} key={i} />
  ));
  return postList
  }

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
            <th>Title<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'newPost')}></button></th>
            <th>Body<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'newPost')}></button></th>
            <th>Classification<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'newClassification')}></button></th>
            <th>Creation<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'creationDate')}></button></th>
            <th>Edited<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'lastEdited')}></button></th>
            <th>Country<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'country')}></button></th>
            <th>Language<button class="sort-by-button" onClick={(e) => changeSortingCriterion(e, 'language')}></button></th>
          </tr>
        </thead>
        <tbody>{thePosts(orderPostsBy)}</tbody>
      </table>
      <div>
    </div>

    </div>
  );
};

