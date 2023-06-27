import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import List from './PostList';
import { Row, Col, Pagination, Table } from 'react-bootstrap';
import { PaginationJSX, PaginationFunction } from '../basicComponents/Pagination';


function SetRoute(postClassification) {
  let navigate = useNavigate(); 

  const [posts, setPosts] = useState([]);
  const { pageNumber } = useParams();

  const [fullPosts, setFullPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const totalItems = fullPosts.length;
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber, 10) || 1);

  useEffect(() => {
    setCurrentPage(parseInt(pageNumber, 10) || 1);
  }, [pageNumber]);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const itemsToDisplay = fullPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalItems / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/${postClassification}/page/${pageNumber}`);
  };

  useEffect(() => {
    let isMounted = true;
    axios.get('https://e-commerce-model.onrender.com/posts/')
      .then(response => {
        console.log('this is response' + response)
        const filteredPosts = response.data.filter(
          post => post.classification === `${postClassification}` )
        if (isMounted) {
          console.log('this is filtered posts' + filteredPosts)
          setFullPosts(filteredPosts)
          setPosts(filteredPosts);
        }
      })
      .catch(error => {
        console.log(error);
      });
    return () => { isMounted = false };
  }, []); 

console.log(fullPosts)

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



