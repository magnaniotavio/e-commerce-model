
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, InputGroup } from 'react-bootstrap'
import { ReturnUserProperties } from '../users/UserId';
import { textInput, selectorInput, textBoxInput } from '../basicComponents/JSXFunctions';
import {  CheckForUserRole } from '../basicComponents/CheckForToken';

// In this component, we allow for the creation of posts
export default function CreatePost() {
  
  const userName = ReturnUserProperties('username'); 

  // Post properties according to the mongoose model
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState("");
  const [author, setAuthor] = useState("")
  const [creationDate, setCreationDate] = useState("");
  const [lastEdited, setLastEdited] = useState("");
  const [language, setLanguage] = useState("");

  // Checks whether the user is an Administrator or not, meaning only Admins will be able to add posts
  CheckForUserRole('Administrator')

  function onSubmit(e) {
    e.preventDefault();
    const currentDate = new Date()        
    // Creates newPost object
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
    // Posts the newly created post
    axios.post('https://e-commerce-model.onrender.com/posts/add_post', createdPost)
    .then(res => {
      console.log(res.data);
      window.alert('Your post was created successfully!');
    })
    .catch(error => console.log(error));
     // Resets the states so we can create a new one
    setContent('');
    setTitle('');
    setClassification('');
    setAuthor('');
    setCreationDate('');
    setLastEdited('');
    setLanguage('');
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