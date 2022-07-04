import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Button, Card, FormLabel, FormSelect, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import FormikControl from './ReusableFormikComponents/FormikControl'

import Cookie from 'js-cookie'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GetEmployeeCategories } from '../Services/EmployeeCategoryService'

import { PostEmployee, UpdateEmployee } from '../Services/EmployeeService'

import Image from 'next/image'
import icon1 from 'assets/svgs/backarrow.svg'


const AddEditEmployeeComponent = ({ data }) => {

    const [Id, setId] = useState(0)

    const [Category, setCategory] = useState(0)
    const [CategoryDropdownOptions, setCategoryDropdownOptions] = useState([])
    const [showCategoryErrorMsg, setshowCategoryErrorMsg] = useState(false)


    const initialValues = {
        Name: '',
        Email: '',
        Category_Id: '',
        Phone: ''
    }

    console.log('data in Employee Compt == ', data);

    const isAddMode = data == '';

    useEffect(() => {
        if (!isAddMode) {
            setId(data.id);
            initialValues.Name = data.name;
            initialValues.Email = data.email;
            initialValues.Phone = data.phone;

            setCategory(data.category_Id);
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


    useEffect(
        () => {
            GetEmployeeCategories()
                .then(res => {

                    setCategoryDropdownOptions(res.data);

                })
        }, []
    )



    const router = useRouter();



    const validationSchema = Yup.object().shape({
        Name: Yup.string().required('Required'),
        Email : Yup.string().required('Required').email().nullable(),
        Phone: Yup.string()
            .required("This field is Required")
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Phone number is not valid"
            )

    })


    const onsubmit = (values) => {

        var UserObj = Cookie.get("UserObj");


        console.log('UserObj == ', UserObj);


        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/employees/create');
        } else {

            if (!isAddMode) {
                values.Created_By = data.created_By;
            }
            else {

                console.log('UserObj == ', JSON.parse(UserObj).id);
                values.Created_By = JSON.parse(UserObj).id;

            }


            if (Category === 0) {
                setshowCategoryErrorMsg(true);
                setLoading(false);
            }




            if (Category !== 0) {

                values.Category_Id = Category;

                if (isAddMode) {
                    setLoading(true)

                    setTimeout(() => {

                        console.log('values--- ', values);


                        PostEmployee(values).then(
                            () => {
                                setLoading(false)

                                toast.success('Employee Category created successfully', { position: toast.POSITION.TOP_RIGHT });

                                router.push('/employees');

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


                        UpdateEmployee(Id, values).then(
                            () => {
                                setHasErrors('')
                                setLoading(false)
                                toast.success('Employee Category updated successfully', { position: toast.POSITION.TOP_RIGHT });


                                router.push('/employees');

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

    }




    const HandleCategoryChange = (e) => {
        console.log(e);

        setshowCategoryErrorMsg(false);
        // passing selected System id to func..



        setCategory(e.target.value);
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

                                        {!isAddMode ? <h3 className=''>Update Employee</h3> : <h3 className=''>Create Employee</h3>}
                                        <button
                                            type='button'
                                            className='btn btn-primary d-flex'
                                            onClick={() => { router.push('/employees') }}
                                        >

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
                                        className='m-3'
                                    />

                                    <FormikControl
                                        control='input'
                                        type='text'
                                        label='Email'
                                        name='Email'
                                        className='m-3'
                                    />

                                    <FormikControl
                                        control='input'
                                        type='text'
                                        label='Phone Number'
                                        name='Phone'
                                        className='m-3'
                                    />


                                    <div className='m-3' style={{ 'minWidth': '310px' }}>

                                        <FormLabel>Category</FormLabel>

                                        <BSForm.Select
                                            value={Category}
                                            onChange={(e) => HandleCategoryChange(e)}
                                            isInvalid={showCategoryErrorMsg}
                                        >
                                            <option key='select' value={'0'}>Select Category</option>
                                            {CategoryDropdownOptions.map((system) =>
                                                <option key={system.id} value={system.id}>{system.name}</option>
                                            )}
                                        </BSForm.Select>
                                        {showCategoryErrorMsg ? (
                                            <div className='text-danger'>{'Required'}</div>
                                        ) : ''}

                                    </div>





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

export default AddEditEmployeeComponent
