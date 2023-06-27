import { useState, useEffect } from 'react';
import { BrowserRouter as useNavigate, useParams } from "react-router-dom";
import { Pagination } from 'react-bootstrap';

/*
export function PaginationFunction({posts, fullPosts, }) {
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
}  */

// Creates a pagination component upon receiving the specified props
export function PaginationJSX({currentPage, totalPages, handlePageChange}) { 
  return (
           <div className="d-flex justify-content-center pt-1">
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
         </div>
         ); 
}

