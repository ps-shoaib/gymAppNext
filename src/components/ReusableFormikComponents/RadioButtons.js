import React from 'react'
import {Field, ErrorMessage } from 'formik'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'

function RadioButtons(props) {
    const {label, name, control, options,  ...rest} = props;
  
    return (
        <>
            <Form.Group className="border m-5">
            <Form.Label className="h6 m-3">{label}</Form.Label>
                <Field  name={name} {...rest}>
                          {(props) => {
                            const {field, form, meta} = props;
                            return options.map(option => {                                   
                                return (
                                        <React.Fragment key={option.key}>
                                            <Form.Check
                                              {...field}
                                              inline
                                              className="mt-3"
                                              label={option.key}
                                              type='radio'
                                              id={option.value}
                                              value={option.value}
                                              checked={field.value === option.value}
                                              isInvalid={ meta.touched && !!meta.error }
                                            />                                                                             
                                        </React.Fragment> 
                                )
                            }) 
                          }
                    }
               </Field>
            </Form.Group>
            <ErrorMessage name={name} component='div' className=" text-danger mr-5" />  
        </>
    )
}

export default RadioButtons

{/* <fieldset>
<Form.Group as={Row} className="mb-3">
  <Form.Label as="legend" column sm={2}>
    Radios
  </Form.Label>
  <Col sm={10}>
    <Form.Check
      type="radio"
      label="first radio"
      name="formHorizontalRadios"
      id="formHorizontalRadios1"
    />
    <Form.Check
      type="radio"
      label="second radio"
      name="formHorizontalRadios"
      id="formHorizontalRadios2"
    />
    <Form.Check
      type="radio"
      label="third radio"
      name="formHorizontalRadios"
      id="formHorizontalRadios3"
    />
  </Col>
</Form.Group>
</fieldset> */}
