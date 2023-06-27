
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { HandleClick, textInput, selectorInput, textBoxInput } from '../basicComponents/JSXFunctions';
import { CheckForToken } from '../basicComponents/CheckForToken';
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
 
  CheckForToken()

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
   <Form onSubmit={onSubmit}>
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