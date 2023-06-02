import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'

function EditProduct() {
   const navigate = useNavigate();
   const currentDate = new Date()              
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        classification: '',
        sizeSML: '',
        sizeNumber: '',
        color: '',
        brand: '',
        price: '',
        customerReview: '',
        popularity: '',
        creationDate: '',
        lastEdited: '',
        targetPublic: '',
    });

    useEffect(() => {
        console.log(id);

      const foundProduct = axios.get(`https://e-commerce-model.onrender.com/products/${id}`)
      foundProduct.then(response => {        
          setProduct({
            name: response.data.name,
            classification: response.data.classification,
            sizeSML: response.data.sizeSML,
            sizeNumber: response.data.sizeNumber,
            color: response.data.color,
            brand: response.data.brand,
            price: response.data.price,
            customerReview: response.data.customerReview,
            popularity: response.data.popularity,
            creationDate: response.data.creationDate,
            lastEdited: response.data.lastEdited,
            targetPublic: response.data.targetPublic,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }, [id]);


    useEffect(() => {
        console.log("Product updated:", product);
      }, [product]);

  const onSubmit = e => {
    e.preventDefault();
  
    if (e.nativeEvent.submitter.name === 'Update') {
      const obj = {
        name: product.name,
        classification: product.classification,
        sizeSML: product.sizeSML,
        sizeNumber: product.sizeNumber,
        color: product.color,
        brand: product.brand,
        price: product.price,
        customerReview: product.customerReview,
        popularity: product.popularity,
        creationDate: product.creationDate,
        lastEdited: product.lastEdited,
        targetPublic: product.targetPublic,
      };  
      axios.post(`https://e-commerce-model.onrender.com/products/update_product/${id}`, obj)
        .then(res => console.log(res.data));
      navigate('/product_list');
    } else if (e.nativeEvent.submitter.name === 'Delete') {
      axios.delete(`https://e-commerce-model.onrender.com/products/delete_product/${id}`)
      .then(res => console.log(res.data));
      navigate('/product_list');

    }
  };

  function JSXInputForm(label, value, onchange) {
    return (
      <Form.Group>
      <Form.Label>{label}</Form.Label>
      <FormControl
        type="text"
        value={value}
        onChange={onchange}
      />
    </Form.Group>    
    )
  }
  
  return (
    <div>
    <Form onSubmit={onSubmit}>
    <div>
      <div className="form-group">
           {JSXInputForm('Title', product.name, (e) =>  setProduct({ ...product, name: e.target.value,}))}
     </div> 
     <Form.Group>
     <Form.Label>Classification:</Form.Label>
     <Form.Control as="select" value={product.classification} onChange={(e) => setProduct({ ...product, classification: e.target.value,})}>
     <option value="" disabled>Masculine</option>
          <option value="ShirtM">Shirts</option>
          <option value="TrouserM">Trousers</option>
          <option value="ShoeM">Shoes</option>
          <option value="" disabled>Feminine</option>
          <option value="ShirtF">Shirts</option>
          <option value="TrouserF">Trousers</option>
          <option value="ShoeF">Shoes</option>
          <option value="" disabled>Kids</option>
          <option value="ShirtK">Shirts</option>
          <option value="TrouserK">Trousers</option>
          <option value="ShoeK">Shoes</option>
     </Form.Control>
</Form.Group>
     <Form.Group>
     <Form.Label>Targeted Public:</Form.Label>
     <Form.Control as="select" value={product.targetPublic} onChange={(e) => setProduct({ ...product, targetPublic: e.target.value,})}>
       <option value="Feminine">Feminine</option>
       <option value="Masculine">Masculine</option>
       <option value="Kids">Kids</option>
     </Form.Control>
    </Form.Group>
     <div className="form-group">
           {JSXInputForm('Price', product.price, (e) =>  setProduct({ ...product, price: e.target.value,}))}
     </div> 
     <Form.Group>
     <Form.Label>Color:</Form.Label>
     <Form.Control as="select" value={product.color} onChange={(e) => setProduct({ ...product, color: e.target.value,})}>
       <option value="White">White</option>
       <option value="Black">Black</option>
       <option value="Blue">Blue</option>
     </Form.Control>
    </Form.Group>
    <Form.Group>
     <Form.Label>Brand:</Form.Label>
     <Form.Control as="select" value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value,})}>
       <option value="Adidas">Adidas</option>
       <option value="Nike">Nike</option>
       <option value="Puma">Puma</option>
     </Form.Control>
    </Form.Group>     
    <Form.Group>
     <Form.Label>Size (SML):</Form.Label>
     <Form.Control as="select" value={product.sizeSML} onChange={(e) => setProduct({ ...product, sizeSML: e.target.value,})}>
       <option value="S">Small</option>
       <option value="M">Medium</option>
       <option value="L">Large</option>
     </Form.Control>
    </Form.Group>      <div className="form-group">
           {JSXInputForm('Size (Number)', product.sizeNumber, (e) =>  setProduct({ ...product, sizeNumber: e.target.value,}))}
     </div> 
     <div className="form-group">
        <input type="submit" value="Update Product" className="btn btn-primary" name="Update" />
        </div>
        <br/>
        <div>
        <div className="form-group">
        <input type="submit" value="Delete Product" className="btn btn-primary" name="Delete" />
        </div>
        </div>
    </div>
    </Form>
   </div>
  );
};

export default EditProduct;