import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Button, Card, FormLabel, FormSelect, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import FormikControl from './ReusableFormikComponents/FormikControl'

import Cookie from 'js-cookie'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Image from 'next/image'
import icon1 from 'assets/svgs/backarrow.svg'
import { GetTrainers, PostMember, UpdateMember } from 'src/Services/MemberService'
import { GetPlans } from 'src/Services/plansService'

import DateView from 'react-datepicker'
import icon3 from '../../assets/svgs/calendar.svg'

const AddEditMemberComponent = ({ data }) => {


    const [isTrainerRequired, SetIsTrainerRequired] = useState(false)


    const [TrainerType, setTrainerType] = useState(0)
    const [TrainerTypeDropdownOptions, setTrainerTypeDropdownOptions] = useState([])
    const [showTrainerTypeErrorMsg, setshowTrainerTypeErrorMsg] = useState(false)

    const [Plan, setPlan] = useState(0)
    const [PlansDropdownOptions, setPlansDropdownOptions] = useState([])
    const [showPlansErrorMsg, setshowPlansErrorMsg] = useState(false)

    const HandlePlansChange = (e) => {

        setshowPlansErrorMsg(false);
        setPlan(e.target.value);
    }

    useEffect(() => {

        GetPlans()
            .then(res => {
                setPlansDropdownOptions(res.data);
            })

    }, [])


    const [Id, setId] = useState(0)

    const initialValues = {

        Name: '',
        Is_Trainer_Required: false,
        TrainingFee: 0,
        Employee_Id: null,

        Gender: '',
        Address: '',
        Occupation: '',
        PhoneNumber: '',
        Email: '',
        EmergencyContactName: '',
        EmergencyContactPhone: ''
    }

    console.log('data == ', data);

    const isAddMode = data == '';

    useEffect(() => {
        if (!isAddMode) {
            // initialValues.Id = data.id;
            setId(data.id);

            initialValues.Name = data.name;
            setPlan(data.plan_Id);
            SetIsTrainerRequired(data.is_Trainer_Required);
            // initialValues.Is_Trainer_Required = data.is_Trainer_Required;
            setStartDate(new Date(data.createdOn));
            initialValues.TrainingFee = data.trainingFee;

            initialValues.Gender = data.gender;
            initialValues.Address = data.address ? data.address : '';
            initialValues.Occupation = data.occupation ? data.occupation : '';
            initialValues.PhoneNumber = data.phoneNumber;
            initialValues.Email = data.email;
            initialValues.EmergencyContactName = data.emergencyContactName ? data.emergencyContactName : '';
            initialValues.EmergencyContactPhone = data.emergencyContactPhone ? data.emergencyContactPhone : '';
            if (data.is_Trainer_Required) {
                setTrainerType(data.employee_Id);
            }
            // initialValues.Employee_Id = data.employee_Id;
        }
    }, [])



    //   const { id } = useParams();


    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState('')


    const router = useRouter();

    const validationSchema = Yup.object().shape({

        Name: Yup.string().required('Required'),
        Gender: Yup.string().required('Required').nullable(),
        PhoneNumber: Yup.string()
            .required("This field is Required")
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Phone number is not valid"
            ),
            EmergencyContactPhone: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Emergency Contact Phone is not valid"
            ),

        Email: Yup.string().required('Required').email().nullable(),


    })


    const dropdownOptions = [
        { key: 'Select Gender', value: '' },
        { key: 'Male', value: 'Male' },
        { key: 'Female', value: 'Female' },
        { key: 'Other', value: 'Other' },
    ]


    const HandleTrainerTypeChange = (e) => {
        setshowTrainerTypeErrorMsg(false);

        setTrainerType(e.target.value);
    }

    useEffect(
        () => {
            if (isTrainerRequired) {
                console.log('calling setTrainerTypeDropdownOptions');

                GetTrainers()
                    .then(res => {
                        setTrainerTypeDropdownOptions(res.data);
                    })
            }
        }, [isTrainerRequired == true]
    )

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
            router.push('/login?callbackUrl=http://localhost:3000/members/create');
        } else {

            if (Plan == 0) {
                setshowPlansErrorMsg(true);
            } else {

                if (isTrainerRequired && TrainerType === 0) {
                    setshowTrainerTypeErrorMsg(true);
                    setLoading(false);
                }
                else {


                    if (!isAddMode) {
                        values.Created_By = data.created_By;
                    }
                    else {

                        console.log('UserObj == ', JSON.parse(UserObj).id);
                        values.Created_By = JSON.parse(UserObj).id;
                    }
                    values.Plan_Id = Plan;
                    values.Is_Trainer_Required = isTrainerRequired;
                    values.CreatedOn = formatDate(startDate);

                    if (isTrainerRequired == true) {
                        values.Employee_Id = TrainerType;
                    } else {
                        values.Employee_Id = null;
                        values.TrainingFee = 0;
                    }

                    console.log('values at onSubmit -- ', values);




                    if (isAddMode) {
                        setLoading(true)

                        setTimeout(() => {

                            console.log('values--- ', values);


                            PostMember(values).then(
                                () => {
                                    setLoading(false)

                                    toast.success('Member created successfully', { position: toast.POSITION.TOP_RIGHT });

                                    router.push('/members');

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


                            UpdateMember(Id, values).then(
                                () => {
                                    setHasErrors('')
                                    setLoading(false)

                                    toast.success('Member updated successfully', { position: toast.POSITION.TOP_RIGHT });

                                    router.push('/members');

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






    const [startDate, setStartDate] = useState(new Date());







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


                                <Form className='m-3'>



                                    <div className='d-flex justify-content-between p-3 m-2'>

                                        {!isAddMode ? <h3 className=''>Update Member</h3> : <h3 className=''>Create Member</h3>}
                                        <button
                                            type='button'
                                            className='btn btn-primary d-flex'
                                            onClick={() => { router.push('/members') }}
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

                                    <div className='d-flex'>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            label='Member Name*'
                                            name='Name'
                                            className='m-2 w-100'
                                        />

                                        <FormikControl
                                            control='select'
                                            options={dropdownOptions}
                                            type='text'
                                            label='Gender'
                                            name='Gender'
                                            className='m-2 w-100'
                                        />
                                        {/* className='m-2 w-100' */}

                                    </div>

                                    <div className='d-flex'>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            label='Phone Number*'
                                            name='PhoneNumber'
                                            className='m-2 w-100'
                                        />
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            label='Email*'
                                            name='Email'
                                            className='m-2 w-100'
                                        />
                                    </div>

                                    <div className='d-flex'>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            label='Address'
                                            name='Address'
                                            className='m-2 w-100'
                                        />
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            label='Occupation'
                                            name='Occupation'
                                            className='m-2 w-100'
                                        />
                                    </div>

                                    <div className='d-flex'>
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            label='Emergency Contact Name'
                                            name='EmergencyContactName'
                                            className='m-2 w-100'
                                        />
                                        <FormikControl
                                            control='input'
                                            type='text'
                                            label='Emergency Contact Phone'
                                            name='EmergencyContactPhone'
                                            className='m-2 w-100'
                                        />
                                    </div>



                                    <div className='m-2 mb-3'
                                    // style={{ 'minWidth': '310px' }}
                                    >

                                        <FormLabel>Select Membership Plan</FormLabel>

                                        <BSForm.Select
                                            value={Plan}
                                            onChange={(e) => HandlePlansChange(e)}
                                            isInvalid={showPlansErrorMsg}
                                        >
                                            <option key='select' value={'0'}>Select Plan</option>
                                            {PlansDropdownOptions.map((system) =>
                                                <option key={system.id} value={system.id}>{system.name}</option>
                                            )}
                                        </BSForm.Select>
                                        {showPlansErrorMsg ? (
                                            <div className='text-danger'>{'Required'}</div>
                                        ) : ''}

                                    </div>


                                    <div className='p-2 m-2'>
                                        <BSForm.Check
                                            type="checkbox"
                                            label="Trainer Required ?"
                                            name="Is_Trainer_Required"
                                            id="requiredChk"
                                            checked={isTrainerRequired}
                                            onClick={
                                                (e: React.MouseEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.checked) {
                                                        SetIsTrainerRequired(true)
                                                    }
                                                    else {
                                                        SetIsTrainerRequired(false);
                                                        setTrainerType(0);
                                                    }
                                                }
                                            }
                                        />
                                    </div>



                                    {isTrainerRequired &&
                                        <>
                                            <div className='m-2 mb-3'
                                            // style={{ 'minWidth': '310px' }}
                                            >

                                                <FormLabel>Select Trainer</FormLabel>

                                                <BSForm.Select
                                                    value={TrainerType}
                                                    onChange={(e) => HandleTrainerTypeChange(e)}
                                                    isInvalid={showTrainerTypeErrorMsg}
                                                >
                                                    <option key='select' value={'0'}>Select Type</option>
                                                    {TrainerTypeDropdownOptions.map((system) =>
                                                        <option key={system.id} value={system.id}>{system.name}</option>
                                                    )}
                                                </BSForm.Select>
                                                {showTrainerTypeErrorMsg ? (
                                                    <div className='text-danger'>{'Required'}</div>
                                                ) : ''}

                                            </div>

                                            <FormikControl
                                                control='input'
                                                type='number'
                                                label='Training Fee'
                                                name='TrainingFee'
                                                className='m-2'
                                            />

                                        </>

                                    }








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

export default AddEditMemberComponent
