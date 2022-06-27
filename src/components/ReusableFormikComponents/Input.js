import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Form, Button, Card } from 'react-bootstrap'


function Input(props) {

    const { label, name, type, placeholder, className,step, disabled,  ...rest } = props;

    return (
        <>
            {/* <div className="form-group m-2">

                <label htmlFor={name} className="h6">{label}</label> 

                <Field id={name} name={name} {...rest} className="form-control"/>
                    <ErrorMessage
                        name={name} 
                        component="div" 
                        className="text-danger" 
                    />                    
            </div> */}

            <Form.Group className={className !== undefined ? className : ''}
                controlId={name}>

                <label htmlFor={name} className="h6">{label}</label>

                <Field name={name}>
                    {(props) => {
                        const { field, form, meta } = props;
                        // console.log('className ==== ', className);
                        // console.log('defaultValue == ', defaultValue);
                        return (
                            <>
                                <Form.Control
                                    {...field}
                                    disabled={disabled}
                                    // defaultValue={defaultValue !== undefined && defaultValue}
                                    type={type}
                                    step={step}
                                    placeholder={placeholder}
                                    isInvalid={meta.touched && !!meta.error}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {/* {meta.error}     */}
                                    <ErrorMessage name={name} component='div' className="text-danger" />

                                </Form.Control.Feedback>
                            </>
                        )
                    }
                    }
                </Field>
            </Form.Group>
        </>
    )
}
export default Input
