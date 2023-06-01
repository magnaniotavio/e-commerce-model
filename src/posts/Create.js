import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
    const navigate = useNavigate();

 const [post, setPost] = useState("");
 const [classification, setClassification] = useState("");

 const [title, setTitle] = useState("")

 const [creationDate, setCreationDate] = useState("");

 const [lastEdited, setLastEdited] = useState("");

 const [country, setCountry] = useState("");

 const [language, setLanguage] = useState("");

 const [postNumber, setPostNumber] = useState("");




 const [posted, setPosted] = useState(false);


    function onChangePost(e) {                 
        setPost(e.target.value);
    }
    function onChangeClassification(e) {                 
        setClassification(e.target.value);
    }
    function onChangeTitle(e) {                 
        setTitle(e.target.value);
    }
    function onChangeDate(e) {   
        const currentDate = new Date()              
        setCreationDate(e.target.value);
    }
    function onChangeCountry(e) {   
        setCountry(e.target.value);
    }
    function onChangeLanguage(e) {   
        setLanguage(e.target.value);
    }
    function onChangePostNumber(e) {   
        setPostNumber(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);                                       
        console.log(`Post: ${post}`);      
        console.log(`Classification: ${classification}`);

    const currentDate = new Date()              

    const newPosts = {

        newTitle: title,
        newPost: post,
        newClassification: classification,
        posted: true,
        creationDate: currentDate,
        lastEdited: '',
        country: country,
        language: language,
        postNumber: postNumber,
        }; 
        console.log(newPosts)

        axios.post('/api/posts', newPosts)
        .then(res => {
          console.log(res.data);
          navigate(`/${newPosts.newTitle}`);
        })
        .catch(error => console.log(error));
              setPost('');
        setClassification('');
        setTitle('');
        setPosted(false);
        setCreationDate('');
        setLastEdited('');
        setCountry('');
        setLanguage('');
        setPostNumber('');
    }

return (
            <div style={{marginTop: 10}}>
                <h3>Make New Post</h3>
                <form onSubmit={onSubmit}>
                <div className="form-group"> 
                        <label>Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={title}
                                onChange={onChangeTitle}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Language: </label>
                        <input  type="text"
                                className="form-control"
                                value={language}
                                onChange={onChangeLanguage}
                                />
                    </div>                <div className="form-group"> 
                        <label>Country: </label>
                        <input  type="text"
                                className="form-control"
                                value={country}
                                onChange={onChangeCountry}
                                />
                    </div>
                    <div className="form-group"> 
                      <label>Post: </label>
                      <textarea
                       rows={10}
                       cols={50}
                       value={post}
                       onChange={onChangePost}
                     />
                    </div>
                    <div className="form-group">
                        <label>Classification: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={classification}
                                onChange={onChangeClassification}
                                />
                    </div>
                    <div className="form-group">
                        <label>PostNumber: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={postNumber}
                                onChange={onChangePostNumber}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
)

}
