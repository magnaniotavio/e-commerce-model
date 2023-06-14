import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useState } from "react";

/*export function HandleClick({url, ...stateValues}) {
  
    return function(e) {
      e.preventDefault();

      const newProduct = {};
      stateValues.forEach((value, index) => {
        const constName = stateNames[index];
        newProduct[constName] = value;
      });
        axios.post(url, newProduct)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => console.log(error));
  
      // Empty the states
      stateNames.forEach((name) => {
        const setState = eval(`set${name.charAt(0).toUpperCase()}${name.slice(1)}`);
       setState('');
   });
     // navigate("/list");
    };
  } */


export function textInput(label, formValue, formFunction) {
  return (    
         <Form.Group>
         <Form.Label>{label}</Form.Label>
         <Form.Control type="text" value={formValue}  onChange={(e) => formFunction(e.target.value)
        } />
       </Form.Group>)
  }

export function selectorInput(label, formValue, formFunction, optionsArray, valuesArray) {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control as="select" value={formValue} onChange={(e) => formFunction(e.target.value)}>
          {optionsArray.map((option, index) => (
            option.includes('disabled: ')
              ? (
                <option key={index} value="" disabled>
                  {option.slice(option.indexOf(' ') + 1)}
                </option>
              )
              : (
                <option key={index} value={valuesArray ? valuesArray[index] : option}>
                  {option}
                </option>
              )
          ))}
        </Form.Control>
      </Form.Group>
    );
  }