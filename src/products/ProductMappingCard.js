    import React, { useState } from 'react';
    import { Container, Col, Image, Row, Pagination, ButtonGroup } from 'react-bootstrap';
    import { useNavigate, useParams, Link } from 'react-router-dom';
    //import SetProductRoutes from '../products/SetProductsRoutes';
    import { useEffect } from 'react';
    import productPic from '../images/productPic.png';
    import { AddToCartButton, LogInToBuy } from '../payment/CartWishlistAndBuyNowButtons';
    import Cookies from 'universal-cookie';
    
export function ProductPresentation({ productsToShow, classification, targetPublic, TypicalButtonPresentation, selectedFilters, isMainRoute, searchTerm, searchType } ) {
    const navigate = useNavigate()
    const { pageNumber } = useParams();
    const [totalResults, setTotalResults] = useState([])
    const totalItems = productsToShow.length;
    const [currentPage, setCurrentPage] = useState(parseInt(pageNumber, 10) || 1);
    const [postsPerPage, setPostsPerPage] = useState(2);
    useEffect(() => {
      setTotalResults(productsToShow);
    }, [productsToShow]);
    useEffect(() => {
      setCurrentPage(parseInt(pageNumber, 10) || 1);
    }, [pageNumber]);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const itemsToDisplay = totalResults.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalItems / postsPerPage);
    const lowerCaseClassification = String(classification).toLowerCase();
    const formatttedClassification = lowerCaseClassification.slice(0, lowerCaseClassification.length - 1) + 's';
    const lowerCaseTargetPublic = String(targetPublic).toLowerCase();

    const cookies = new Cookies();
    const token = cookies.get("TOKEN"); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, [token]);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
     if (searchType === 'filtered_search') {
         if (selectedFilters && isMainRoute) {
           navigate(`/${lowerCaseTargetPublic}/${formatttedClassification}/page/${pageNumber}`);
         } else if (selectedFilters) {
           navigate(`/products/?classification=${classification}&page=${pageNumber}`);
         }
        } 
      else if (searchType === 'default_category_search') 
        {navigate(`/search/${classification}/${searchTerm}/page/${pageNumber}`)}
    };

    return (
    <div>
      <Container>
    </Container>
    {itemsToDisplay.map(product => (
    <div key={product.id} className="product">
      <Container className="mt-4">
    <Row>
      <Col md={6}>
        <Image src={productPic} alt={product.name} fluid />
      </Col>
      <Col md={6}>
        <h3><Link  to={`/product/${product._id}`}>{product.name}</Link></h3>
        <p>{product.brand}</p>
        <hr />
        <h4>Price: ${product.price}</h4>
       <div>
        {isLoggedIn &&
          <>
          <TypicalButtonPresentation prop={product._id} />
        </>
       }        
       </div>
      </Col>
    </Row>
  </Container>
    </div>
  ))
  }
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
    )
}



/* SEARCH RESULTS

<div>
        {itemsToDisplay.map(product => (
          <div key={product._id} className="product">
            <Container className="mt-4">
          <Row>
            <Col md={6}>
              <Image src={productPic} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <h3><Link  to={`/product/${product._id}`}>{product.name}</Link></h3>
              <p>{product.brand}</p>
              <hr />
              <h4>Price: ${product.price}</h4>
              <div>
               {typeof userIsLoggedIn !== 'undefined' ? (
                 <>
               <AddToCartButton button="cart" productId={product._id}/>
               <AddToCartButton button="wishlist" productId={product._id}/>
               <AddToCartButton button="buy_now" productId={product._id}/>
               </>
               ) : ''}
               </div>
            </Col>
          </Row>
        </Container>
          </div>
        ))
        }
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

      </div> */

/* HOMEPAGE

    <Container>
      <Carousel pause="hover" style={{backgroundColor: 'lightgrey'}}>
        {product.map((p) => (
          <Carousel.Item key={p._id}>
            <Row className="justify-content-center">
              <Col md={6}>
                <Image src={productPic} alt={p.name} fluid />
              </Col>
              <Col md={6}>
              <h3><Link  to={`/product/${p._id}`}>{p.name}</Link></h3>
                <ReactMarkdown>{p.description}</ReactMarkdown>
                <p className="mt-3">{`$${p.price}`}</p>
                <TypicalButtonPresentation productId={p._id} />
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
 */
/*  FILTERED SEARCH


<div>
      <Container>
    </Container>
    {itemsToDisplay.map(product => (
    <div key={product.id} className="product">
      <Container className="mt-4">
    <Row>
      <Col md={6}>
        <Image src={productPic} alt={product.name} fluid />
      </Col>
      <Col md={6}>
        <h3><Link  to={`/product/${product._id}`}>{product.name}</Link></h3>
        <p>{product.brand}</p>
        <hr />
        <h4>Price: ${product.price}</h4>
        <div>
        {typeof userIsLoggedIn !== 'undefined' ? (
          <>
          <TypicalButtonPresentation productId={product._id} />
        </>
        ) : ''}
        </div>
      </Col>
    </Row>
  </Container>
    </div>
  ))
  }


  </div> 
  */