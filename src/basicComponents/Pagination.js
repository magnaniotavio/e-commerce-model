import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from 'react-bootstrap';
import { BrowserRouter as Router } from "react-router-dom";

/* The following function creates the pagination logic for our paginated components
   All you need is to give an array of itens as props, plus a 'urlPath' for the URL,
   and it handles the logic for you. Thus, it easier to create paginated components. */
       export const PaginationFunction = ({ itensArray, urlPath }) => {
        const navigate = useNavigate();
        const { pageNumber } = useParams(); // Retrieves the current page number from the URL parameters
        const totalItems = itensArray.length;  // Total number of items in the itensArray array
        const [itensPerPage, setItensPerPage] = useState(2); // State for number of posts to display per page
        const [currentPage, setCurrentPage] = useState(parseInt(pageNumber, 10) || 1);  // State for the current page number
      
        const startIndex = (currentPage - 1) * itensPerPage; // Index of the first item to display on the current page
        const endIndex = startIndex + itensPerPage; // Index of the last item to display on the current page
        const itemsToDisplay = itensArray.slice(startIndex, endIndex); // Subset of itensArray for the current page
        const totalPages = Math.ceil(totalItems / itensPerPage); // Total number of pages based on the number of items per page
      
        /* Navigates to new page using the lower case, pluralized urlPath (if urlPath is 'Blogpost',
           it navigates to /blogposts/page/number */
        const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
          navigate(`/${String(urlPath).toLowerCase()+'s'}/page/${pageNumber}`);
        };
      
        return {
          setItensPerPage,
          setCurrentPage,
          itensPerPage,
          totalItems,
          currentPage,
          itemsToDisplay,
          totalPages,
          handlePageChange,
        };
      };
      
      
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

