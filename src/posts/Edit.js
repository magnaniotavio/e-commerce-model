import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckForToken } from '../basicComponents/CheckForToken';
import { textInput, selectorInput, textBoxInput } from '../basicComponents/CrudFunctions';
import { Form } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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


return (
  <div style={{ marginTop: 10 }}>
    <form onSubmit={onSubmit}>
  <h3 style={{ color: 'black' }}>Make New Post</h3>
    {textBoxInput('New Post', content, setContent)}
    {textInput('Post Title', title, setTitle)}
    {selectorInput('Classification', classification, setClassification, ['Announcement', 'Blogpost', 'Available soon'] )}
    {textInput('Author', author, setAuthor)}
    {textInput('Language', language, setLanguage)}
    <div className="form-group">
        <input type="submit" value="Update Todo" className="btn btn-primary" name="Update" />
        </div>
        <br/>
        <div>
        <div className="form-group">
        <input type="submit" value="Delete Todo" className="btn btn-primary" name="Delete" />
        </div>
        </div>
      </form>
</div>);
}; 

/*
function EditPost() {

    const currentDate = new Date()              
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
      postTitle: '',
      postBody: '',
      postClassification: '',
      postIsPosted: false,
      lastEdited: '',
      postCountry: '',
      postLanguage: '',
      postNumber: '',
    });
  

    CheckForToken()
    
    useEffect(() => {
      const hello = axios.get(`https://e-commerce-model.onrender.com/posts/${id}`)
      hello.then(response => {
          setPost({
            postTitle: response.data.newTitle,
            postBody: response.data.newPost,
            postClassification: response.data.newClassification,
            postIsPosted: response.data.post_completed,
            postCreationDate: response.data.creationDate,
            lastEdited: response.data.lastEdited,
            postCountry: response.data.country,
            postLanguage: response.data.language,
            postNumber: response.data.postNumber,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }, [id]);

const onChangePostTitle = (e) => {
      setPost({
        ...post,
        postTitle: e.target.value,
        lastEdited: currentDate,
      });
    };

  const onChangePostBody = (e) => {
    setPost({
      ...post,
      postBody: e.target.value,
      lastEdited: currentDate,
    });
  };

  const onChangePostClassification = (e) => {
    setPost({
      ...post,
      postClassification: e.target.value,
      lastEdited: currentDate,
    });
  };

  const onChangePostIsPosted = () => {
    setPost({
      ...post,
      postIsPosted: !post.postIsPosted,
      lastEdited: currentDate,
    });
  };

  const onChangePostCountry = (e) => {
    setPost({
      ...post,
      postCountry: e.target.value,
      lastEdited: currentDate,
    });
  };

  const onChangePostLanguage = (e) => {
    setPost({
      ...post,
      postLanguage: e.target.value,
      lastEdited: currentDate,
    });
  };

  const onChangePostNumber = (e) => {
    setPost({
      ...post,
      postNumber: e.target.value,
      lastEdited: currentDate,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
  
    if (e.nativeEvent.submitter.name === 'Update') {
      const obj = {
        newTitle: post.postTitle,
        newPost: post.postBody,
        newClassification: post.postClassification,
        post_completed: post.postIsPosted,
        creationDate: post.postCreationDate,
        lastEdited: post.lastEdited,
        country: post.postCountry,
        language: post.postLanguage,
        postNumber: post.postNumber,
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


  return (
    <div>
      <h3 align="center">Title</h3>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label>Title: </label>
          <input type="text"
            className="form-control"
            value={post.postTitle}
            onChange={onChangePostTitle}
          />
        </div>
        <div className="form-group">
          <label>Language: </label>
          <input type="text"
            className="form-control"
            value={post.postLanguage}
            onChange={onChangePostLanguage}
          />
        </div>
        <div className="form-group">
          <label>Country: </label>
          <input type="text"
            className="form-control"
            value={post.postCountry}
            onChange={onChangePostCountry}
          />
        </div>

        <div className="form-group">
          <label>Body: </label>
          <textarea
        rows={10}
        cols={50}
        value={post.postBody}
        onChange={onChangePostBody}
      />
  </div> 
        <div className="form-group">
          <label>Classification: </label>
          <input type="text"
            className="form-control"
            value={post.postClassification}
            onChange={onChangePostClassification}
          />
        </div>
        <div className="form-group">
          <label>Post Number: </label>
          <input type="text"
            className="form-control"
            value={post.postNumber}
            onChange={onChangePostNumber}
          />
        </div>
        <div className="form-group">
        </div>
        <div className="form-check">
          <input className="form-check-input"
            id="completedCheckbox"
            type="checkbox"
            name="completedCheckbox"
            onChange={onChangePostIsPosted}
            checked={post.postIsPosted}
            value={post.postIsPosted}
          />
          <label className="form-check-label" htmlFor="completedCheckbox">
            Completed
          </label>
        </div>
        <br />
        <div className="form-group">
        <input type="submit" value="Update Todo" className="btn btn-primary" name="Update" />
        </div>
        <br/>
        <div>
        <div className="form-group">
        <input type="submit" value="Delete Todo" className="btn btn-primary" name="Delete" />
        </div>
        </div>
      </form>
    </div>
  );
}; */
