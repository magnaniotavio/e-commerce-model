import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, Row, Col, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function SearchFunctions() {
 let navigate = useNavigate(); 
 const location = useLocation();
 const { pathname } = location;
 const [searchTerm, setSearchTerm] = useState('');
 const [posts, setPosts] = useState([]);
 const [ids, setIds] = useState([]);
 const [products, setProducts] = useState([]);
 const [searchSelection, setSearchSelection] = useState('');

 function handleInputChange(event) {
  event.preventDefault();
  setSearchTerm(event.target.value);
}

function HandleSubmit(event, navigate) {
  event.preventDefault();
  setPosts([]); // Clear previous search results
    if (event) {
    navigate(`/search/${searchTerm}`);
  }  
  axios.get('http://localhost:4000/products/')
    .then(response => {
      const foundPosts = response.data.filter(post => {
        for (let key in post)
         {
          if (post[key].toString().includes(searchTerm)) {
            return true;
          }
        }
        return false;
      });
      const boldSearchTerm = `**${searchTerm}**`
      const highlightedPosts = JSON.parse(JSON.stringify(foundPosts).replaceAll(searchTerm, boldSearchTerm));
      setPosts(highlightedPosts);
    })
    .catch(error => {
      console.log(error);
    })
}

function SelectedSearch(event, navigate, selectedSection) {
  event.preventDefault();
  setProducts([]); // Clear previous search results
    if (event && searchTerm) {
    navigate(`/search/${searchTerm}`);
      axios.get('http://localhost:4000/products/')
      .then(response => 
        {if (typeof selectedSection === 'String') {{
          const foundPosts = response.data.filter(post => {
          // Filter based on selectedSection and searchTerm
          if (post.classification === selectedSection) {
            if (post.name.includes(searchTerm)) {
              return true;
            }
          }
          return false;
        });
        const foundIds = foundPosts.map(post => post._id);
        setIds(foundIds);
        }}
      else {
        navigate(`/search/${searchTerm}`);
        const foundPosts = response.data.filter(post => {
          // Filter based on selectedSection and searchTerm
           {
            if (post.name.includes(searchTerm)) {
              return true;
            }
          }
          return false;
        });
        const foundIds = foundPosts.map(post => post._id);
        setIds(foundIds);
      }}
      )
      .catch(error => {
        console.log(error);
      });
  }}

useEffect(() => {
  const fetchProducts = async () => {
    for (let i in ids) {
      try {
        const response = await axios.get(`http://localhost:4000/products/${ids[i]}`);
        const product = response.data;
        setProducts(prevProducts => [...prevProducts, product]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (ids.length > 0) {
    fetchProducts();
  }
}, [ids]); 

console.log("SearchFunction:" + searchTerm, posts, products)

 return {
  searchTerm,
  setSearchTerm,
  posts,
  setPosts,
  products,
  setProducts,
  SelectedSearch,
  navigate,
  searchSelection,
  setSearchSelection,
  handleInputChange,
};
}

export function SearchForm() {
  const {   searchTerm, setSearchTerm, posts, setPosts, products, setProducts, SelectedSearch, navigate, searchSelection, setSearchSelection, handleInputChange} = SearchFunctions();
  console.log("SearchForm:" + searchTerm, posts, products)

  return (
    <Container>
      <Form onSubmit={(event) => SelectedSearch(event, navigate, searchSelection)} className="d-flex">
        <Form.Control 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleInputChange} 
          className="mr-sm-2" style={{backgroundColor: "white", color: "black"}}
        />
      <Form.Select value={searchSelection} onChange={(event) => setSearchSelection(event.target.value)} onSubmit={(event) => SelectedSearch(event, navigate, searchSelection)}>
          <option value="undefined">All</option>
          <option value="Shirt">Shirts</option>
          <option value="Trouser">Trousers</option>
          <option value="Socks">Socks</option>
      </Form.Select>
      <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} 
       onClick={(event) => SelectedSearch(event, navigate, searchSelection)}>Search</Button>
      </Form>
  </Container>
  )
}

export function FunctionMapping({ posts }) {
  if (!posts || posts.length === 0) {
      return <div></div>;
    }
  
return (
  <div className="textblock">
    {posts.map(post => (
      <div key={post.id} className="post">
        <Link to={`/edit/${post._id}`}>
        <h3 className="post-title">{post.newTitle}</h3>
        </Link>
        <div className="post-content">
          <ReactMarkdown>
            {post.newPost}
          </ReactMarkdown>
        </div>
      </div>
    ))}
  </div>
);
}

export function SearchProducts() {
  const location = useLocation();
  const searchFunctions = SearchForm();
  const {
    searchTerm,
    posts,
    products
  } = searchFunctions;
  console.log("SearchProducts:" + searchTerm, posts, products);

return (
  <div>
    <Container>
    </Container>
    {location.pathname === `/search/${searchTerm}` && <FunctionMapping posts={posts} />}
    {products.map(product => (
    <div key={product.id} className="product">
      <Container className="mt-4">
    <Row>
      <Col md={6}>
      </Col>
      <Col md={6}>
        <h3>{product.name}</h3>
        <p>{product.brand}</p>
        <hr />
        <h4>Price: ${product.price}</h4>
        <Button type="submit" variant="outline-dark" style={{backgroundColor: "black", color: "white"}} >Add to Cart</Button>
        <Button type="submit" variant="outline-dark" style={{backgroundColor: "black", color: "white"}} ><h6>Add to Wishlist</h6></Button>
      </Col>
    </Row>
  </Container>
    </div>
  ))
  }
  </div>
);
}
