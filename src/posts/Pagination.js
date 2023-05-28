import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import List from '../components/PostList';
import { Row, Col, Pagination, Table } from 'react-bootstrap';


export function Pagination({pageContent}) {
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
    navigate(`/announcements/page/${pageNumber}`);
  };
}

export function PaginationJSX() { 
  return (
           <>
          <Pagination>
             <Pagination.First disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
             <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
             {[...Array(totalPages)].map((_, index) => (
               <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                 {index + 1}
               </Pagination.Item>
             ))}
             <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
             <Pagination.Last disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)} />
           </Pagination>
         </>
         ); 
}
