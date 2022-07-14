import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Button, Card, FormLabel, FormSelect, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import FormikControl from './ReusableFormikComponents/FormikControl'

import Cookie from 'js-cookie'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AdministrationManager_URL, PostUser, UpdateUser } from '../Services/userService'

import Image from 'next/image'
import icon1 from 'assets/svgs/backarrow.svg'
import axios from 'axios'
import { API_URL } from 'src/Services/authService'


const AddEditUserComponent = ({ data }) => {
    const [Id, setId] = useState(0)

    const [Role, setRole] = useState('')
    const [RoleDropdownOptions, setRoleDropdownOptions] = useState([])
    const [showRoleErrorMsg, setshowRoleErrorMsg] = useState(false)


    const initialValues = {
        UserName: '',
        Email: '',
        Role_Id: '',
        Password: '',
        ConfirmPassword: '',

    }

    console.log('data in Employee Compt == ', data);

    const isAddMode = data == '';

    useEffect(() => {
        if (!isAddMode) {
            setId(data.id);
            initialValues.UserName = data.userName;
            initialValues.Email = data.email;

            setRole(data.role);
        }
    }, [])



    //   const { id } = useParams();


    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState('')

    //   useEffect(
    //     () => {
    //       setTimeout(() => {
    //         if (!isAddMode) {

    //           GetEmployeeRoleById(id).then((res => {
    //             console.log('response data of EmployeeRole by id ----', res.data);

    //             initialValues.Name = res.data.name;

    //           }))
    //         }
    //       }, 200);

    //     }, []
    //   )


    useEffect(
        () => {
            axios.get(`${AdministrationManager_URL}/AllRoles`)
                .then(res => {

                    setRoleDropdownOptions(res.data);

                })
        }, []
    )



    const router = useRouter();



    let validationSchema = Yup.object().shape({
        UserName: Yup.string().required('Required'),
        Email: Yup.string().required('Required').email().nullable(),
        // Phone: Yup.string()
        //     .required("This field is Required")
        //     .matches(
        //         /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        //         "Phone number is not valid"
        //     )

    })

    if (isAddMode) {
        validationSchema = Yup.object().shape({
            UserName: Yup.string().required('Required'),
            Email: Yup.string().required('Required').email().nullable(),
            Password: Yup.string().min(6, 'Minimum 6 symbols')
                .max(50, 'Maximum 50 symbols')
                .required('Password is required'),

            ConfirmPassword: Yup.string()
                .required('Password confirmation is required')
                .when('Password', {
                    is: (val) => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf([Yup.ref('Password')], "Password and Confirm Password didn't match"),
                })
        });
    }



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


            if (Role === '') {
                setshowRoleErrorMsg(true);
                setLoading(false);
            }




            if (Role !== '') {

                values.Role = Role;

                if (isAddMode) {
                    setLoading(true)

                    setTimeout(() => {

                        console.log('values--- ', values);


                        PostUser(values).then(
                            () => {
                                setLoading(false)

                                toast.success('User created successfully', { position: toast.POSITION.TOP_RIGHT });

                                router.push('/users');

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
                                        JSON.parse(
                                            Obj.message
                                        );

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


                        UpdateUser(Id, values).then(
                            () => {
                                setHasErrors('')
                                setLoading(false)
                                toast.success('User updated successfully', { position: toast.POSITION.TOP_RIGHT });


                                router.push('/users');

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




    const HandleRoleChange = (e) => {
        console.log('Rooooooooooooooole -- ', e.target.value);

        setshowRoleErrorMsg(false);
        // passing selected System id to func..



        setRole(e.target.value);
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


                                <Form className='m-5'>


                                    <div className='d-flex justify-content-between p-3 m-2'>

                                        {!isAddMode ? <h3 className=''>Update User</h3> : <h3 className=''>Create User</h3>}
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
                                        label='User Name'
                                        name='UserName'
                                        placeholder='Name without space'
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
                                        type='password'
                                        label='Password'
                                        name='Password'
                                        className='m-3'
                                    />

                                    <FormikControl
                                        control='input'
                                        type='password'
                                        label='Confirm Password'
                                        name='ConfirmPassword'
                                        className='m-3'
                                    />

                                    <div className='m-3' style={{ 'minWidth': '310px' }}>

                                        <FormLabel>Role</FormLabel>

                                        <BSForm.Select
                                            value={Role}
                                            onChange={(e) => HandleRoleChange(e)}
                                            isInvalid={showRoleErrorMsg}
                                        >
                                            <option key='select' value={''}>Select Role</option>
                                            {RoleDropdownOptions.map((system) =>
                                                <option key={system.id} value={system.name}>{system.name}</option>
                                            )}
                                        </BSForm.Select>
                                        {showRoleErrorMsg ? (
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

export default AddEditUserComponent