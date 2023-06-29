import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { PaginationJSX, PaginationFunction } from '../basicComponents/Pagination';
import { BrowserRouter } from 'react-router-dom';

/* In this component we determine the presentation of posts once the user accesses them through one of the
   main routes, such as 'Blogpost', 'Announcement' etc., which will be determined as parameters of the function */

function SetRoute(postClassification) {
  let navigate = useNavigate(); 

  // Gets the posts and filters them according to the parameter of classification
  const [retrievedPosts, setRetrivedPosts] = useState([]);

  // Filtering the classified posts
  useEffect(() => {
    let isMounted = true;
    axios.get('https://e-commerce-model.onrender.com/posts/')
      .then(response => {
        const filteredPosts = response.data.filter(
          post => post.classification === `${postClassification}` )
        if (isMounted) {
          setRetrivedPosts(filteredPosts)
        }
      })
      .catch(error => {
        console.log(error);
      });
    return () => { isMounted = false };
  }, []); 

   // Getting the pagination constants, and defining its props
   const {
    setItensPerPage,
    setCurrentPage,
    itensPerPage,
    totalItems,
    currentPage,
    itemsToDisplay,
    totalPages,
    handlePageChange
  } = PaginationFunction({ itensArray: retrievedPosts, urlPath:postClassification });

  return (
    <>
    <Table>
      <thead>
        {/* table header */}
      </thead>
      <tbody>
      {itemsToDisplay.map(post => (
        <div key={post._id} className="post">
         <Link to={`/${post.title}/${post._id}`}>
         <h3 className="post-title">{post.title}</h3>
        </Link>
          <div className="post-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      ))}
      </tbody>
    </Table>
    <PaginationJSX currentPage = {currentPage} totalPages = {totalPages} handlePageChange = {handlePageChange} />
  </>
  ); 
}

export {
  SetRoute,
}; 



