
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { ReturnUserProperties, ReturnUserRole } from '../users/UserId';
import { HandleClick, textInput, selectorInput, textBoxInput } from '../basicComponents/JSXFunctions';
import { CheckForToken, CheckForUserRole } from '../basicComponents/CheckForToken';

            import Cookies from 'universal-cookie';
           import jwtDecode from 'jwt-decode';
             let decoded;
            const cookies = new Cookies();   

export default function CreatePost() {
  const navigate = useNavigate();
  const userName = ReturnUserProperties('username');
  
              const token = cookies.get("TOKEN");
            decoded = jwtDecode(token);
            const userId = decoded.userId;
            console.log(decoded)
            useEffect(() => {
              if (!token) {
                navigate("/homepage");
              } 
              else {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              }
            }, [navigate, token]);

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState("");
  const [author, setAuthor] = useState("")
  const [creationDate, setCreationDate] = useState("");
  const [lastEdited, setLastEdited] = useState("");
  const [language, setLanguage] = useState("");

 // CheckForToken()

  function onSubmit(e) {
    e.preventDefault();
    const currentDate = new Date()              
    const createdPost = {
    content: content,
    title: title,
    classification: classification,
    creation_date: userName,
    author: currentDate,
    last_edited: '',
    language: language,
    }; 
    console.log('this is createpost' + JSON.stringify(createdPost))
    axios.post('https://e-commerce-model.onrender.com/posts/add_post', createdPost)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => console.log(error));
    setContent('');
    setTitle('');
    setClassification('');
    setAuthor('');
    setCreationDate('');
    setLastEdited('');
    setLanguage('');
    navigate(`/${createdPost.title}`);
}

  return (
    <div style={{ marginTop: 10 }}>
      <h3 style={{ color: 'black' }}>Make New Post</h3>
      <Form onSubmit={onSubmit}>
        {textBoxInput('New Post', content, setContent)}
        {textInput('Post Title', title, setTitle)}
        {selectorInput('Classification', classification, setClassification, ['Announcement', 'Blogpost', 'Available soon'] )}
        {textInput('Language', language, setLanguage)}
        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </div>
    )
}