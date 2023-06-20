import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Container, Row, Col } from 'react-bootstrap';

function PostPage() {

  const { title } = useParams();
  const {id} = useParams();
  const {classification} = useParams();

  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    let isMounted = true;
    axios.get(`https://e-commerce-model.onrender.com/posts/${id}`)
      .then(response => {
        if (isMounted) {
          setPost({
            title: response.data.title,
            content: response.data.content,
          });
        }
      })
      .catch(error => {
        console.log('error:', error);
      });
    return () => { isMounted = false };
  }, [title, classification]);
  
  return (
    <div>
        <Container>
      <Row>
        <Col>
          <h1 className="text-center">{post.title}</h1>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
    </div>
    
  );
};

export default PostPage;
