
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'
import { textInput, selectorInput } from '../basicComponents/JSXFunctions';
import { CheckForUserRole } from '../basicComponents/CheckForToken';

// In this component, we allow for the creation of products
export default function CreateProduct() {

  // Product properties according to the mongoose model
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
 
  // Checks whether the user is an Administrator or not, meaning only Admins will be able to add products
  CheckForUserRole('Administrator')

  function onSubmit(e) {
         e.preventDefault();
    // Creates newProduct object
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
    // Posts the product 
     axios.post('https://e-commerce-model.onrender.com/products/add_product', newProduct)
       .then(res => {
       console.log(res.data)
       window.alert('Your product was created successfully!');
       })
       .catch(error => console.log(error));
       // Resets the states so we can create a new one
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