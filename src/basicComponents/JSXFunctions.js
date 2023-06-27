import React from "react";
import { Form } from "react-bootstrap";

export function textInput(label, formValue, formFunction) {
  return (    
         <Form.Group>
         <Form.Label>{label}</Form.Label>
         <Form.Control type="text" value={formValue}  onChange={(e) => formFunction(e.target.value)
        } />
       </Form.Group>)
  }

export function dateInput(label, formValue, formFunction) {
    return (    
           <Form.Group>
           <Form.Label>{label}</Form.Label>
           <Form.Control type="date" value={formValue}  onChange={(e) => formFunction(e.target.value)
          } />
         </Form.Group>)
    }

export function numberInput(label, formValue, formFunction) {
      return (    
             <Form.Group>
             <Form.Label>{label}</Form.Label>
             <Form.Control type="number" value={formValue}  onChange={(e) => formFunction(e.target.value)
            } />
           </Form.Group>)
      }

export function passwordInput(label, formValue, formFunction) {
        return (    
               <Form.Group>
               <Form.Label>{label}</Form.Label>
               <Form.Control type="password" value={formValue}  onChange={(e) => formFunction(e.target.value)
              } />
             </Form.Group>)
        }
  

export function textBoxInput(label, formValue, formFunction) {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={formValue}
          onChange={(e) => formFunction(e.target.value)}
        />
      </Form.Group>
    );
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