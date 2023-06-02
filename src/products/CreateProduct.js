import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { ReturnUserProperties, ReturnUserRole } from '../users/UserId';

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

    function onChangeName(e) {                 
        setName(e.target.value);
    }
    function onChangeNumber(e) {                 
        setNumber(e.target.value);
    }
    function onChangeClassification(e) {   
        setClassification(e.target.value);
    }
    function onChangesizeSML(e) {   
        setSizeSML(e.target.value);
    }
    function onChangeSizeNumber(e) {   
        setSizeNumber(e.target.value);
    }    
    function onChangeColor(e) {   
        setColor(e.target.value);
    }
    function onChangeBrand(e) {   
        setBrand(e.target.value);
    }
    function onChangePrice(e) {   
        setPrice(e.target.value);
    }
    function onChangeCustomerReview(e) {   
        setCustomerReview(e.target.value);
    }
    function onChangePopularity(e) {   
        setPopularity(e.target.value);
    }
    function onChangeDate(e) {   
        const currentDate = new Date()              
        setCreationDate(e.target.value);
    }
    function onChangeDescription(e) {   
      setDescription(e.target.value);
  }
  function onChangeCondition(e) {   
    setCondition(e.target.value);
}
function onChangeAvailability(e) {   
  setAvailability(e.target.value);
}
function onChangeTargetPublic(e) {   
  setTargetPublic(e.target.value);
}



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

    axios.post('https://e-commerce-model.onrender.com/add_product', newProduct)
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
    <Form.Group controlId="name">
      <Form.Label>Name:</Form.Label>
      <Form.Control type="text" value={name} onChange={onChangeName} />
    </Form.Group>

    <Form.Group controlId="description">
      <Form.Label>Description:</Form.Label>
      <Form.Control type="text" value={description} onChange={onChangeDescription} />
    </Form.Group>

    <Form.Group>
     <Form.Label>Classification:</Form.Label>
     <Form.Control as="select" value={classification} onChange={(e) => setClassification(e.target.value)}>
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
     <Form.Control as="select" value={targetPublic} onChange={(e) => setTargetPublic(e.target.value)}>
       <option value="Feminine">Feminine</option>
       <option value="Masculine">Masculine</option>
       <option value="Kids">Kids</option>
     </Form.Control>
</Form.Group>
    <Form.Group>
     <Form.Label>Color:</Form.Label>
     <Form.Control as="select" value={color} onChange={(e) => setColor(e.target.value,)}>
       <option value="White">White</option>
       <option value="Black">Black</option>
       <option value="Blue">Blue</option>
     </Form.Control>
    </Form.Group>

    <Form.Group>
     <Form.Label>Condition:</Form.Label>
     <Form.Control as="select" value={condition} onChange={(e) => setCondition(e.target.value,)}>
       <option value="New">New</option>
       <option value="Used">Used</option>
     </Form.Control>
    </Form.Group>

    <Form.Group>
     <Form.Label>Availability:</Form.Label>
     <Form.Control as="select" value={availability} onChange={(e) => setAvailability(e.target.value,)}>
       <option value="In stock">In stock</option>
       <option value="Not available">Not available</option>
       <option value="Available soon">Available soon</option>
     </Form.Control>
    </Form.Group>

    <Form.Group>
     <Form.Label>Size:</Form.Label>
     <Form.Control as="select" value={sizeSML} onChange={(e) => setSizeSML(e.target.value,)}>
       <option value="Small">Small</option>
       <option value="Medium">Medium</option>
       <option value="Large">Large</option>
     </Form.Control>
    </Form.Group>

    <Form.Group>
     <Form.Label>Brand:</Form.Label>
     <Form.Control as="select" value={brand} onChange={(e) => setBrand(e.target.value,)}>
       <option value="Adidas">Adidas</option>
       <option value="Nike">Nike</option>
       <option value="Puma">Puma</option>
     </Form.Control>
    </Form.Group>
    
    <Form.Group controlId="price">
      <Form.Label>Price:</Form.Label>
      <Form.Control type="text" value={price} onChange={onChangePrice} />
    </Form.Group>

    <Form.Group controlId="number">
      <Form.Label>Number:</Form.Label>
      <Form.Control type="text" value={number} onChange={onChangeNumber} />
    </Form.Group>

    <Button variant="primary" type="submit">
      Create Todo
    </Button>
  </Form>
</div>
)
}
