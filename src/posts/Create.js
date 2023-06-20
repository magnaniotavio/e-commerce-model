
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { ReturnUserProperties, ReturnUserRole } from '../users/UserId';
import { HandleClick, textInput, selectorInput, textBoxInput } from '../basicComponents/CrudFunctions';
import { CheckForToken, CheckForUserRole } from '../basicComponents/CheckForToken';

export default function CreatePost() {
  const navigate = useNavigate();
  const userName = ReturnUserProperties('username');
  
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState("");
  const [author, setAuthor] = useState("")
  const [creationDate, setCreationDate] = useState("");
  const [lastEdited, setLastEdited] = useState("");
  const [language, setLanguage] = useState("");

  CheckForToken()

  function onSubmit(e) {
    e.preventDefault();
    const currentDate = new Date()              
    const createdPost = {
    content: content,
    title: title,
    classification: classification,
  //  author: 'ssssssssssssss',
    creation_date: currentDate,
    last_edited: '',
    language: language,
    }; 
    console.log('this is createpost' + JSON.stringify(createdPost))
    axios.post('https://e-commerce-model.onrender.com/posts/add', createdPost)
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
/*
export default function CreateProduct() {

 const navigate = useNavigate();
 const currentDate = new Date()              
 const [name, setName] = useState("");
 const [classification, setClassification] = useState("");
 const [sizeSML, setSizeSML] = useState("");
 const [sizeNumber, setSizeNumber] = useState("");
 const [color, setColor] = useState("");
 const [brand, setBrand] = useState("");
 const [price, setPrice] = useState("");
 const [customerReview, setCustomerReview] = useState("");
 const [popularity, setPopularity] = useState("");
 const [creationDate, setCreationDate] = useState("");
 const [number, setNumber] = useState("");
 const [description, setDescription] = useState("");
 const [condition, setCondition] = useState("");
 const [availability, setAvailability] = useState("");
 const [targetPublic, setTargetPublic] = useState("");

    function onSubmit(e) {
        e.preventDefault();

    const newProduct = {
        name: name,
        classification: classification,
        sizeSML: sizeSML,
        sizeNumber: sizeNumber,
        color: color,
        brand: brand,
        price: price,
        customerReview: customerReview,
        popularity: popularity,
        creationDate: currentDate,
        number: number,
        description: description,
        condition: condition,
        availability: availability,
        targetPublic: targetPublic,
        }; 
    axios.post('https://e-commerce-model.onrender.com/products/add_product', newProduct)
      .then(res => {
      //  navigate(`/${newProduct.newname}`);
      console.log(res.data)
      })
      .catch(error => console.log(error));
        setName('');
        setClassification('');
        setSizeSML('');
        setSizeNumber('');
        setColor('');
        setBrand('');
        setPrice('');
        setCustomerReview('');
        setPopularity('');
        setCreationDate('');
        setNumber('');
        setDescription('');
        setCondition('');
        setAvailability('');
        setTargetPublic('');
        navigate("/product_list")
    }


return (
<div style={{ marginTop: 10 }}>
  <h3 style={{ color: 'black' }}>Make New Product</h3>
  <Form onSubmit={handleClickStates}>
    {textInput('Name', name, setName)}
    {textInput('Description', description, setDescription)}
    {selectorInput('Classification', classification, setClassification, 
       ['disabled: Masculine', 'Shirts', 'Trousers', 'Shoes', 
        'disabled: Feminine', 'Shirts', 'Trousers', 'Shoes',
        'disabled: Kids', 'Shirts', 'Trousers', 'Shoes',],
       ['', 'ShirtM', 'TrouserM', 'ShoeM', 
        '', 'ShirtF', 'TrouserF', 'ShoeF',
        '', 'ShirtK', 'TrouserK', 'ShoeK',],
     )}
    {selectorInput('Targeted Public', targetPublic, setTargetPublic, ['Feminine', 'Masculine', 'Kids'] )}
    {selectorInput('Color', color, setColor, ['White', 'Black', 'Blue'] )}
    {selectorInput('Condition', condition, setCondition, ['New', 'Used'] )}
    {selectorInput('Availability', availability, setAvailability, ['In stock', 'Not available', 'Available soon'] )}
    {selectorInput('Size', sizeSML, setSizeSML, ['Small', 'Medium', 'Large'] )}
    {selectorInput('Brand', brand, setBrand, ['Adidas', 'Nike', 'Puma'] )}
    <Button variant="primary" type="submit">
      Create Product
    </Button>
  </Form>
</div>
)
} 

*/


/*import React, { useState, useEffect } from 'react';
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

        axios.post('https://e-commerce-model.onrender.com/posts/add', newPosts)
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


        const handleClickStates = handleClick(
        'https://e-commerce-model.onrender.com/posts/add',
        'newTitle',
        'newPost',
        'newClassification',
        'posted',
        'creationDate',
        'lastEdited',
        'country',
        'language',
        'postNumber',
        }; 
      );

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



       //     import Cookies from 'universal-cookie';
       //     import jwtDecode from 'jwt-decode';
         //   let decoded;
      //      const cookies = new Cookies();   
         
      /*

export default function CreatePost() {
  const navigate = useNavigate();
  const userName = ReturnUserProperties('username');
       //     const token = cookies.get("TOKEN");
          //  decoded = jwtDecode(token);
        //    const userId = decoded.userId;
      //      console.log(decoded)
         //   useEffect(() => {
       //       if (!token) {
          //      navigate("/homepage");
        //      } 
      //        else {
      //          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
       //       }
     //       }, [navigate, token]);
  
  const [newPost, setNewPost] = useState("");
  const [newClassification, setNewClassification] = useState("");
  const [newTitle, setNewTitle] = useState("")
  const [creationDate, setCreationDate] = useState("");
  const [lastEdited, setLastEdited] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [postNumber, setPostNumber] = useState("");
  const [posted, setPosted] = useState(false);

  CheckForToken()

  function onSubmit(e) {
    e.preventDefault();
    const currentDate = new Date()              
    const createdPost = {
    newTitle: newTitle,
    newPost: newPost,
    newClassification: newClassification,
    posted: true,
    creationDate: currentDate,
    lastEdited: '',
    country: country,
    language: language,
    postNumber: postNumber,
    }; 
    axios.post('https://e-commerce-model.onrender.com/posts/add', createdPost)
    .then(res => {
      console.log(res.data);
      navigate(`/${createdPost.newTitle}`);
    })
    .catch(error => console.log(error));
    setNewPost('');
    setNewClassification('');
    setNewTitle('');
    setPosted(false);
    setCreationDate('');
    setLastEdited('');
    setCountry('');
    setLanguage('');
    setPostNumber('');
}
  return (
    <div style={{ marginTop: 10 }}>
      hhahahahahah{userName}
      <h3 style={{ color: 'black' }}>Make New Post</h3>
      <Form onSubmit={onSubmit}>
        {textBoxInput('New Post', newPost, setNewPost)}
        {textInput('Post Title', newTitle, setNewTitle)}
        {selectorInput('Classification', newClassification, setNewClassification, ['Announcement', 'Blogpost', 'Available soon'] )}
        {textInput('Country', country, setCountry)}
        {textInput('Language', language, setLanguage)}
        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </Form>
    </div>
    )
}

/*
export default function CreateProduct() {

 const navigate = useNavigate();
 const currentDate = new Date()              
 const [name, setName] = useState("");
 const [classification, setClassification] = useState("");
 const [sizeSML, setSizeSML] = useState("");
 const [sizeNumber, setSizeNumber] = useState("");
 const [color, setColor] = useState("");
 const [brand, setBrand] = useState("");
 const [price, setPrice] = useState("");
 const [customerReview, setCustomerReview] = useState("");
 const [popularity, setPopularity] = useState("");
 const [creationDate, setCreationDate] = useState("");
 const [number, setNumber] = useState("");
 const [description, setDescription] = useState("");
 const [condition, setCondition] = useState("");
 const [availability, setAvailability] = useState("");
 const [targetPublic, setTargetPublic] = useState("");

    function onSubmit(e) {
        e.preventDefault();

    const newProduct = {
        name: name,
        classification: classification,
        sizeSML: sizeSML,
        sizeNumber: sizeNumber,
        color: color,
        brand: brand,
        price: price,
        customerReview: customerReview,
        popularity: popularity,
        creationDate: currentDate,
        number: number,
        description: description,
        condition: condition,
        availability: availability,
        targetPublic: targetPublic,
        }; 
    axios.post('https://e-commerce-model.onrender.com/products/add_product', newProduct)
      .then(res => {
      //  navigate(`/${newProduct.newname}`);
      console.log(res.data)
      })
      .catch(error => console.log(error));
        setName('');
        setClassification('');
        setSizeSML('');
        setSizeNumber('');
        setColor('');
        setBrand('');
        setPrice('');
        setCustomerReview('');
        setPopularity('');
        setCreationDate('');
        setNumber('');
        setDescription('');
        setCondition('');
        setAvailability('');
        setTargetPublic('');
        navigate("/product_list")
    }


return (
<div style={{ marginTop: 10 }}>
  <h3 style={{ color: 'black' }}>Make New Product</h3>
  <Form onSubmit={handleClickStates}>
    {textInput('Name', name, setName)}
    {textInput('Description', description, setDescription)}
    {selectorInput('Classification', classification, setClassification, 
       ['disabled: Masculine', 'Shirts', 'Trousers', 'Shoes', 
        'disabled: Feminine', 'Shirts', 'Trousers', 'Shoes',
        'disabled: Kids', 'Shirts', 'Trousers', 'Shoes',],
       ['', 'ShirtM', 'TrouserM', 'ShoeM', 
        '', 'ShirtF', 'TrouserF', 'ShoeF',
        '', 'ShirtK', 'TrouserK', 'ShoeK',],
     )}
    {selectorInput('Targeted Public', targetPublic, setTargetPublic, ['Feminine', 'Masculine', 'Kids'] )}
    {selectorInput('Color', color, setColor, ['White', 'Black', 'Blue'] )}
    {selectorInput('Condition', condition, setCondition, ['New', 'Used'] )}
    {selectorInput('Availability', availability, setAvailability, ['In stock', 'Not available', 'Available soon'] )}
    {selectorInput('Size', sizeSML, setSizeSML, ['Small', 'Medium', 'Large'] )}
    {selectorInput('Brand', brand, setBrand, ['Adidas', 'Nike', 'Puma'] )}
    <Button variant="primary" type="submit">
      Create Product
    </Button>
  </Form>
</div>
)
} 

*/


/*import React, { useState, useEffect } from 'react';
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

        axios.post('https://e-commerce-model.onrender.com/posts/add', newPosts)
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


        const handleClickStates = handleClick(
        'https://e-commerce-model.onrender.com/posts/add',
        'newTitle',
        'newPost',
        'newClassification',
        'posted',
        'creationDate',
        'lastEdited',
        'country',
        'language',
        'postNumber',
        }; 
      );

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

*/
