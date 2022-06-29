import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Button, Card, FormLabel, FormSelect, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import FormikControl from './ReusableFormikComponents/FormikControl'

import Cookie from 'js-cookie'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GetExpenseTypes } from 'src/Services/ExpenseTypeService'
import { PostExpense, UpdateExpense } from '../Services/ExpenseService'

import DateView from 'react-datepicker'
import icon3 from '../../assets/svgs/calendar.svg'

import Image from 'next/image'
import icon1 from 'assets/svgs/backarrow.svg'
import { GetEmployees } from 'src/Services/EmployeeService'


const AddEditExpenseComponent = ({ data }) => {

    const [ExpenseType, setExpenseType] = useState(0)
    const [ExpenseTypeDropdownOptions, setExpenseTypeDropdownOptions] = useState([])
    const [showExpenseTypeErrorMsg, setshowExpenseTypeErrorMsg] = useState(false)

    const initialValues = {
        Amount: 0,
    }

    const [Id, setId] = useState(0)

    console.log('data *** ', data);

    const isAddMode = data == '';

    useEffect(() => {
        if (!isAddMode) {
            setId(data.id);
            initialValues.Amount = data.amount;

            setExpenseType(data.expenseType_Id);

            setStartDate(new Date(data.createdOn));

            setEmployee(data.employee_Id);

            if (data.employee_Id !== null) {
                setShowEmployees(true);
            }

        }
    }, [])

    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState('')

    useEffect(
        () => {
            GetExpenseTypes()
                .then(res => {
                    setExpenseTypeDropdownOptions(res.data);
                })
        }, []
    )

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        Amount: Yup.string().required('Required')
    })

    const [showEmployees, setShowEmployees] = useState(false)
    const [Employee, setEmployee] = useState(0)

    const [employeesDropDownOptions, setEmployeesDropDownOptions] = useState([])
    const [showEmployeeErrorMsg, setshowEmployeeErrorMsg] = useState(false)


    useEffect(
        () => {
            if (showEmployees) {
                console.log('calling set employeesDropdown option');

                GetEmployees()
                    .then(res => {
                        setEmployeesDropDownOptions(res.data);
                    })
            }
        }, [showEmployees == true]
    )

    const HandleExpenseTypeChange = (e) => {

        setshowExpenseTypeErrorMsg(false);
        // passing selected System id to func..

        console.log('selected value ', e.target.value);

        var selectedObject = ExpenseTypeDropdownOptions.find(a => a.id == e.target.value);

        console.log('selectedObject name == ', selectedObject.name);



        if (selectedObject.name.toLowerCase() == 'salary') {
            setShowEmployees(true);
        } else {
            setShowEmployees(false);
        }


        setExpenseType(e.target.value);
    }

    const HandleEmployeeChange = (e) => {
        setshowEmployeeErrorMsg(false);

        setEmployee(e.target.value);
    }

    const [startDate, setStartDate] = useState(new Date());

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    const onsubmit = (values) => {

        var UserObj = Cookie.get("UserObj");


        console.log('UserObj == ', UserObj);


        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/expenses/create');
        } else {

            if (!isAddMode) {
                values.Created_By = data.created_By;
            }
            else {

                console.log('UserObj == ', JSON.parse(UserObj).id);
                values.Created_By = JSON.parse(UserObj).id;

            }


            if (ExpenseType === 0) {
                setshowExpenseTypeErrorMsg(true);
                setLoading(false);
            }

            if (showEmployees && Employee == 0) {
                setshowEmployeeErrorMsg(true);
                setLoading(false);
            }
            else {
                values.Employee_Id = Employee;
            }




            if (ExpenseType !== 0) {

                if (showEmployees && Employee == 0) {

                } else {



                    values.ExpenseType_Id = ExpenseType;
                    values.CreatedOn = formatDate(startDate);


                    if (isAddMode) {
                        setLoading(true)

                        setTimeout(() => {

                            console.log('values--- ', values);


                            PostExpense(values).then(
                                () => {
                                    setLoading(false)

                                    toast.success('Expense created successfully', { position: toast.POSITION.TOP_RIGHT });

                                    router.push('/expenses');

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

                                        toast.error(Obj.message, { position: toast.POSITION.BOTTOM_RIGHT });

                                        setHasErrors(obj2.errorMessage);


                                    }

                                })
                        }, 100)

                    }
                    else {
                        setLoading(true)
                        setHasErrors(undefined)

                        setTimeout(() => {

                            console.log('Id in State variable == ', Id);


                            UpdateExpense(Id, values).then(
                                () => {
                                    setHasErrors('')
                                    setLoading(false)


                                    toast.success('Expense updated successfully', { position: toast.POSITION.TOP_RIGHT });

                                    router.push('/expenses');

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

                                        setHasErrors(obj2.errorMessage);


                                    }

                                })
                        }, 100)


                    }
                }

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

                                        {!isAddMode ? <h3 className=''>Update Expense</h3> : <h3 className=''>Create Expense</h3>}
                                        <button
                                            type='button'
                                            className='btn btn-primary d-flex'
                                            onClick={() => { router.push('/expenses') }}
                                        >

                                            <Image
                                                src={icon1}
                                                alt={icon1}
                                                width="23"
                                                height="23"
                                                className="roundedCircle"
                                            />
                                            <span className=''>

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





                                    <div className='m-3'>
                                        <h6>Membership Date </h6>
                                        <div className='d-flex'>
                                            <DateView
                                                className="form-control"
                                                // name='startDate'
                                                id='dt1'
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart
                                                startDate={startDate}
                                                disabled={!isAddMode}
                                            // endDate={endDate}
                                            // dateFormat="MM/yyyy"
                                            // showMonthYearPicker


                                            />
                                            <label htmlFor='dt1' className='m-2'>
                                                <span className=""
                                                    style={
                                                        { 'position': 'relative', 'right': '37px' }
                                                    }

                                                >
                                                    <Image
                                                        src={icon3}
                                                        alt={icon3}
                                                        width="23"
                                                        height="23"
                                                    // className="roundedCircle"
                                                    />


                                                </span>
                                            </label>
                                        </div>
                                    </div>



                                    <div className='m-3' style={{ 'minWidth': '310px' }}>

                                        <FormLabel>Expense Type</FormLabel>

                                        <BSForm.Select
                                            value={ExpenseType}
                                            onChange={(e) => HandleExpenseTypeChange(e)}
                                            isInvalid={showExpenseTypeErrorMsg}
                                        >
                                            <option key='select' value={'0'}>Select Type</option>
                                            {ExpenseTypeDropdownOptions.map((system) =>
                                                <option key={system.id} value={system.id}>{system.name}</option>
                                            )}
                                        </BSForm.Select>
                                        {showExpenseTypeErrorMsg ? (
                                            <div className='text-danger'>{'Required'}</div>
                                        ) : ''}

                                    </div>


                                    {showEmployees &&
                                        <div className='m-3' style={{ 'minWidth': '310px' }}>

                                            <FormLabel>Employee</FormLabel>

                                            <BSForm.Select
                                                value={Employee}
                                                onChange={(e) => HandleEmployeeChange(e)}
                                                isInvalid={showEmployeeErrorMsg}
                                            >
                                                <option key='select' value={'0'}>Select Employee</option>
                                                {employeesDropDownOptions.map((system) =>
                                                    <option key={system.id} value={system.id}>{system.name}</option>
                                                )}
                                            </BSForm.Select>
                                            {showEmployeeErrorMsg ? (
                                                <div className='text-danger'>{'Required'}</div>
                                            ) : ''}

                                        </div>
                                    }


                                    <FormikControl
                                        control='input'
                                        type='number'
                                        label='Expense Amount'
                                        name='Amount'
                                        className='m-3 mb-5'
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

export default AddEditExpenseComponent
