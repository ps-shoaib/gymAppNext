import React from 'react'
import {Field, ErrorMessage } from 'formik'
import { Form, Button, Card, FormLabel } from 'react-bootstrap'

function Select(props) {
    const {label, name,options,className, ...rest} = props;

    return (

            <Form.Group className={className !== undefined ? className : ''} controlId={name}>
            {/* <Form.Label>{label}</Form.Label> */}


            <Field  name={name}>
            {(props) => {
                    const {field, form, meta} = props;
                        return (
                            <>

                                {/* <FloatingLabel className="m-2" controlId="floatingSelect" label={label}> */}
                              
                                <FormLabel >{label}</FormLabel>
                                    <Form.Select aria-label="Floating label select example"
                                                as="select" 
                                                {...field}
                                                isInvalid={ meta.touched && !!meta.error }
                                    >
                                        {
                                            options.map(option => {
                                                return (
                                                    <option key={option.value} value={option.value}>
                                                        {option.key}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Form.Select> 
                                    <ErrorMessage name={name} component='div' className="text-danger" />          
                                    {/* <Form.Control.Feedback type="invalid">
                                    {meta.error}    
                                </Form.Control.Feedback> */}

{/*                                                                     
                                </FloatingLabel> */}

                            </>                                  
                        )}
            }

            </Field>     
            </Form.Group>

    )
}

export default Select
