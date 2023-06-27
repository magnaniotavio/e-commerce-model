import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';
import { CheckForToken, CheckForUser } from '../basicComponents/CheckForToken';
import { selectorInput, textInput, textBoxInput } from '../basicComponents/JSXFunctions';

import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
let decoded;
const cookies = new Cookies();   


function EditProduct() {
  const navigate = useNavigate();

            const token = cookies.get("TOKEN");
            decoded = jwtDecode(token);
            const userId = decoded.userId;
            console.log(decoded)
            useEffect(() => {
              if (!token) {
                navigate("/homepage");
              } 
              else {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              }
            }, [navigate, token]); 
          
   const currentDate = new Date()              
    const { id } = useParams();
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
    const [condition, setCondition] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("");
    const [targetPublic, setTargetPublic] = useState("");
  
    CheckForToken()

    useEffect(() => {
        console.log(id);

      const foundProduct = axios.get(`https://e-commerce-model.onrender.com/products/${id}`)
      foundProduct.then(response => {        
            setName(response.data.name);
            setClassification(response.data.classification);
            setSizeSML(response.data.sizeSML);
            setSizeNumber(response.data.size);
            setColor(response.data.color);
            setBrand(response.data.brand);
            setPrice(response.data.price);
            setCustomerReview(response.data.customerReview);
            setPopularity(response.data.popularity);
            setDescription(response.data.number);
            setCondition(response.data.condition);
            setAvailability(response.data.availability);
            setDescription(response.data.description);
            setTargetPublic(response.data.targetPublic);
        })
        .catch(error => {
          console.log(error);
        });
    }, [id]);

  const onSubmit = e => {
    e.preventDefault();
  
    if (e.nativeEvent.submitter.name === 'Update') {
      const obj = {
        name: name,
        classification: classification,
        sizeSML: sizeSML,
        sizeNumber: sizeNumber,
        color: color,
        brand: brand,
        price: price,
        customerReview: customerReview,
        popularity: popularity,
        creationDate: creationDate,
        lastEdited: currentDate,
        description: description,
        targetPublic: targetPublic,
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

  return (
    <Form onSubmit={onSubmit}>
      <div>
 <div style={{ marginTop: 10 }}>
   <h3 style={{ color: 'black' }}>Make New Product</h3>
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
     <ButtonGroup>
     <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} type="submit" name="Update">
        Update Product
      </Button>
      <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} type="submit" name="Delete">
        Delete Product
      </Button>
     </ButtonGroup>
    </div>
    </div>
    </Form>
  );
};

export default EditProduct;