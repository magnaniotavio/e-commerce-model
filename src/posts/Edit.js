import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckForToken, CheckForUserRole } from '../basicComponents/CheckForToken';
import { textInput, selectorInput, textBoxInput } from '../basicComponents/JSXFunctions';
import { Form } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

// In this component, we allow for the editing of posts
export default function EditPost() {

  const currentDate = new Date()              
  const { id } = useParams();
  const navigate = useNavigate();

  // Properties according to the mongoose model
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState("");
  const [author, setAuthor] = useState("")
  const [creationDate, setCreationDate] = useState("");
  const [lastEdited, setLastEdited] = useState("");
  const [language, setLanguage] = useState("");

  // Checks whether the user is an Administrator or not, meaning only Admins will be able to perform the operation
  CheckForUserRole('Administrator')  

  // Here we retrieve the data to be edited
  useEffect(() => {
    // Gets the post according to the id found by useParams()
    const foundPosts = axios.get(`https://e-commerce-model.onrender.com/posts/${id}`)
    // Sets the states according to the data received, so that the user will see it in the editing fields
    foundPosts.then(response => {
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

  // Here we post the edited data, or delete it if that's what we wish, according to the button name
     const onSubmit = e => {
     e.preventDefault();
     if (e.nativeEvent.submitter.name === 'Update') {
        // Creates new object with the updated data
       const obj = {
         content: content,
         title: title,
         classification: classification,
         author: author,
         creation_date: creationDate,
         last_edited: currentDate,
         language: language,
       };  
       // Posts updated data
       axios.post(`https://e-commerce-model.onrender.com/posts/update/${id}`, obj)
         .then(res => console.log(res.data));
       navigate('/postlist');
     } 
     // Deletes data
     else if (e.nativeEvent.submitter.name === 'Delete') {
       axios.delete(`https://e-commerce-model.onrender.com/posts/delete/${id}`)
       .then(res => console.log(res.data));
       navigate('/postlist');
     }
   };
   
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
