import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckForToken } from '../basicComponents/CheckForToken';
import { textInput, selectorInput, textBoxInput } from '../basicComponents/JSXFunctions';
import { Form } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
//import Cookies from "universal-cookie"

//import jwtDecode from 'jwt-decode';
//let decoded;
//const cookies = new Cookies();   

export default function EditPost() {

  const currentDate = new Date()              
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState("");
  const [author, setAuthor] = useState("")
  const [creationDate, setCreationDate] = useState("");
  const [lastEdited, setLastEdited] = useState("");
  const [language, setLanguage] = useState("");


  CheckForToken()
  
  useEffect(() => {
    const hello = axios.get(`https://e-commerce-model.onrender.com/posts/${id}`)
    hello.then(response => {
          setContent(response.data.content)
          setTitle(response.data.title)
          setClassification(response.data.classification)
          setAuthor(response.data.author)
          setCreationDate(response.data.creation_date)
          setLastEdited(response.data.last_edited)
          setLanguage(response.data.language)
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

const onSubmit = e => {
  e.preventDefault();

  /*content
title
classification
author
creation_date
last_edited
language */

  if (e.nativeEvent.submitter.name === 'Update') {
    const obj = {
      content: content,
      title: title,
      classification: classification,
      author: author,
      creation_date: creationDate,
      last_edited: currentDate,
      language: language,
    };  
    axios.post(`https://e-commerce-model.onrender.com/posts/update/${id}`, obj)
      .then(res => console.log(res.data));
    navigate('/postlist');
  } else if (e.nativeEvent.submitter.name === 'Delete') {

    axios.delete(`https://e-commerce-model.onrender.com/posts/delete/${id}`)
    .then(res => console.log(res.data));
    navigate('/postlist');
  }
};

//{textInput('Title', post.postTitle, setName)}
//{textInput('Language', description, setDescription)}
//{textBoxInput('New Post', content, setContent)}

return (
  <div style={{ marginTop: 10 }}>
    <form onSubmit={onSubmit}>
  <h3 style={{ color: 'black' }}>Make New Post</h3>
    {textBoxInput('New Post', content, setContent)}
    {textInput('Post Title', title, setTitle)}
    {selectorInput('Classification', classification, setClassification, ['Announcement', 'Blogpost', 'Available soon'] )}
    {textInput('Author', author, setAuthor)}
    {textInput('Language', language, setLanguage)}
    <ButtonGroup>
     <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} type="submit" name="Update">
        Update Product
      </Button>
      <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} type="submit" name="Delete">
        Delete Product
      </Button>
     </ButtonGroup>
      </form>
</div>);
}; 
