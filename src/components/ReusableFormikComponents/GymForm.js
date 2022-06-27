import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import { Button, Card, Row, Col } from 'react-bootstrap'
import FormikControl from './FormikControl'

function GymForm() {

    const initialValues = {

      // fullName : '',
      // gender : '',
      // city : '',
      // zipCode : '',
      // occupation : '',
      // phone : '',
      // email : '',
      // emergency_cotact_Name : '',
      // emergency_cotact_phone : '',
      // membership_person_wise : '',









        email : '',
        comments : '',
        selectOption : '',
        radioOption : '',
        checkBoxOption : [],
        birthDate : null
    }

    const validationSchema = Yup.object({
        email : Yup.string().required('Required'),
        comments : Yup.string().required('Required'),
        selectOption : Yup.string().required('Required'),
        radioOption : Yup.string().required('Required'),
        checkBoxOption : Yup.array().min(1, 'Required'),
        birthDate : Yup.date().required('Required').nullable()
        
        // checkBoxOption : Yup.object().shape({
        //   option : Yup.string().required('Required'),
        //   value : Yup.string().required('Required')
        // })

    })

    const dropdownOptions = [
        {key : 'Select an option', value : ''},
        {key : 'option1', value : 'option1'},
        {key : 'option2', value : 'option2'},
        {key : 'option3', value : 'option3'},
    ]

    const RadioOptions = [
      {key : 'option1', value : 'option1'},
      {key : 'option2', value : 'option2'},
      {key : 'option3', value : 'option3'},
    ]

    const CheckBoxOptions = [
      {key : 'option4', value : 'option4'},
      {key : 'option5', value : 'option5'},
      {key : 'option6', value : 'option6'},
    ]

    let  onsubmit = values => {
      console.log('Form Data', values);

      let FormObj = JSON.parse(JSON.stringify(values));

      console.log('Saved Data ', JSON.parse(JSON.stringify(values)));

      let DateObj = new Date(FormObj.birthDate);
      console.log('Date Obj --- ', DateObj);


    }

    return (
        <Formik
          initialValues = {initialValues}
          validationSchema = {validationSchema}
           onSubmit = {onsubmit}        
        >
            {
                formik => {
                  return (
                        <Form>
                            {/* ------------- */}
                            <FormikControl 
                                control='input' 
                                type='email'
                                label='Email'
                                name='email'
                                className='m-5'
                              />
                            {/* ------------- */}
                            <FormikControl 
                                control='textarea' 
                                type='text'
                                label='Comments'
                                name='comments'
                              />
                            {/* ------------- */}
                            <FormikControl 
                                control='select' 
                                options={dropdownOptions}
                                type='text'
                                label='Select a topic'
                                name='selectOption'
                              />
                            {/* ------------- */}
                            <FormikControl 
                                control='radio' 
                                options={RadioOptions}
                                label='Radio topic'
                                name='radioOption'  
                              />
                            {/* ------------- */}
                            <FormikControl 
                                control='checkbox' 
                                options={CheckBoxOptions}
                                label='CheckBox topic'
                                name='checkBoxOption'  
                             />
                            {/* ------------- */}
                            <FormikControl 
                                control='date' 
                                // options={CheckBoxOptions}
                                label='Pic a Date'
                                name='birthDate'  
                             />
                            {/* ------------- */}
                            <Button className="m-1" type='submit'>
                                Submit
                            </Button>
                              {/* ------------- */}
                        </Form>
                    )
                }
            }
        </Formik>
        )
}


export default GymForm
