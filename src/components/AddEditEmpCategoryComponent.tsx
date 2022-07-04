import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Button, Card, FormLabel, FormSelect, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { GetEmployeeCategoryById, PostEmployeeCategory, UpdateEmployeeCategory } from '../Services/EmployeeCategoryService'

import FormikControl from './ReusableFormikComponents/FormikControl'

import Cookie from 'js-cookie'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import icon1 from 'assets/svgs/backarrow.svg'

const AddEditEmpCategoryComponent = ({ data }) => {

    const [Id, setId] = useState(0)

    const initialValues = {
        Name: ''
    }

    console.log('data == ', data);

    const isAddMode = data == '';

    useEffect(() => {
    if (!isAddMode) {
        setId(data.id);
        initialValues.Name = data.name;
    }
    }, [])



    //   const { id } = useParams();


    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState('')

    //   useEffect(
    //     () => {
    //       setTimeout(() => {
    //         if (!isAddMode) {

    //           GetEmployeeCategoryById(id).then((res => {
    //             console.log('response data of EmployeeCategory by id ----', res.data);

    //             initialValues.Name = res.data.name;

    //           }))
    //         }
    //       }, 200);

    //     }, []
    //   )

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('Required')

    })


    const onsubmit = (values) => {

        var UserObj = Cookie.get("UserObj");


        console.log('UserObj == ', UserObj);


        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/employees/categories/create');
        } else {

        if (!isAddMode) {
            values.Created_By = data.created_By;
        }
        else {

            console.log('UserObj == ', JSON.parse(UserObj).id);
            values.Created_By = JSON.parse(UserObj).id;

        }


        if (isAddMode) {
            setLoading(true)

            setTimeout(() => {

                console.log('values--- ', values);


                PostEmployeeCategory(values).then(
                    () => {
                        setLoading(false)

                        toast.success('Employee Category created successfully', { position: toast.POSITION.TOP_RIGHT });

                        router.push('/employees/categories');

                    })
                    .catch((error) => {
                        setLoading(false)

                        let Obj = error.toJSON();
                        console.log('1111111');
                        console.log('Obj', Obj);
                        if (Obj.message === 'Network Error') {

                            toast.error('API Server is down....', { position: toast.POSITION.BOTTOM_RIGHT });

                            setHasErrors('API Server is down....');
                        }
                        else {
                            let obj2 =
                                // JSON.parse(
                                Obj.message
                            //  );

                            toast.error(obj2.errorMessage, { position: toast.POSITION.BOTTOM_RIGHT });

                            setHasErrors(obj2.errorMessage);


                        }

                    })
            }, 100)

        }
        else {
            setLoading(true)
            setHasErrors(undefined)

            setTimeout(() => {


                UpdateEmployeeCategory(Id, values).then(
                    () => {
                        setHasErrors('')
                        setLoading(false)

                        toast.success('Employee Category Updated successfully', { position: toast.POSITION.TOP_RIGHT });

                        router.push('/employees/categories');

                    })
                    .catch((error) => {
                        setLoading(false)

                        let Obj = error.toJSON();
                        console.log('1111111');
                        console.log('Obj', Obj);
                        if (Obj.message === 'Network Error') {

                            setHasErrors('API Server is down....');
                        }
                        else {
                            let obj2 = JSON.parse(Obj.message);
                            toast.error(obj2.errorMessage, { position: toast.POSITION.BOTTOM_RIGHT });

                            setHasErrors(obj2.errorMessage);


                        }

                    })
            }, 100)


        }

    }


    }






    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onsubmit}
            >
                {
                    formik => {
                        return (
                            <div className={'card  mb-xl-4 w-100'}>


                                <Form className=''>

                                    <div className='d-flex justify-content-between p-3 m-2'>

                                        {!isAddMode ? <h3>Update Employee Category</h3> : <h3>Create Employee Category</h3>}
                                        <button type='button'  className='btn btn-primary d-flex' onClick={() => { router.push('/employees/categories') }}>

                                            <Image
                                                src={icon1}
                                                alt={icon1}
                                                width="23"
                                                height="23"
                                                className="roundedCircle m-1"
                                            />
                                            <span className='m-1'>

                                                Back
                                            </span>
                                        </button>


                                    </div>

                                    {hasErrors ? (
                                        <div className='m-5'>
                                            <div className='mb-lg-15 alert alert-danger'>
                                                <div className='alert-text font-weight-bold'>{hasErrors}</div>
                                            </div>
                                        </div>
                                    ) : ''}



                                    <FormikControl
                                        control='input'
                                        type='text'
                                        label='Name'
                                        name='Name'
                                        className='m-5'
                                    />






                                    <div className='m-5'>
                                        <div className='m-5'>
                                            <Button variant="success" className="w-100 p-2" type='submit'>

                                                <div className='d-flex justify-content-center'>
                                                    {!isAddMode ? <span>Update </span> : <span> Create</span>}

                                                    {loading && (
                                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                                        </span>
                                                    )}
                                                </div>

                                            </Button>
                                        </div>
                                    </div>



                                </Form>

                            </div>
                        )
                    }
                }
            </Formik>
        </>
    )
}

export default AddEditEmpCategoryComponent
