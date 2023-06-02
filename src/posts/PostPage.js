import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Container, Row, Col } from 'react-bootstrap';

function PostPage() {

  const { newTitle } = useParams();
  const {id} = useParams();
  const {newClassification} = useParams();

  const [post, setPost] = useState({
    postTitle: '',
    postBody: '',
  });

  useEffect(() => {
    let isMounted = true;
    axios.get(`/https://e-commerce-model.onrender.com/posts/${newClassification}/${newTitle}/${id}`)
      .then(response => {
        if (isMounted) {
          setPost({
            postTitle: response.data.newTitle,
            postBody: response.data.newPost,
          });
        }
      })
      .catch(error => {
        console.log('error:', error);
      });
    return () => { isMounted = false };
  }, [newTitle, newClassification]);
  
  return (
    <div>
        <Container>
      <Row>
        <Col>
          <h1 className="text-center">{post.postTitle}</h1>
          <ReactMarkdown>{post.postBody}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
    </div>
    
  );
};

export default PostPage;
