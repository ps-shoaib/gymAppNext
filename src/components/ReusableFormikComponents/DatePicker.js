import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Field, ErrorMessage } from 'formik'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import DateView from 'react-datepicker'


const DatePicker = (props) => {

    const { label, name, className, ...rest } = props;


    console.log('*********Date Picker Rendering*********');


    return (
        <Form.Group className={className}>
            <Form.Label className="h6">{label}</Form.Label>

            <Field name={name}>
                {
                    (props) => {
                        const { field, form, meta } = props;
                        const { setFieldValue } = form;
                        const { value } = field;

                        return (
                            <>
                                <DateView
                                    id={name}
                                    {...field}
                                    {...rest}
                                    className="form-control"
                                    selected={value}

                                    onChange={(val) => setFieldValue(name, val)}
                                // isInvalid={ meta.touched && !!meta.error }
                                />
                            </>
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component='div' className="text-danger" />


        </Form.Group>
    )
}

export default DatePicker