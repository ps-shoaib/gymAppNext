import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Button, Card, FormLabel, FormSelect, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'



import Cookie from 'js-cookie'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import DateView from 'react-datepicker'
import icon1 from 'assets/svgs/backarrow.svg'
import { GetMembers } from 'src/Services/MemberService'


import icon3 from '../../assets/svgs/calendar.svg'
import Image from 'next/image'
import { PostFee, UpdateFee } from 'src/Services/FeeService'


import axios from 'axios'
import { API_URL } from 'src/Services/authService'

import Select from 'react-select'
import FormikControl from './ReusableFormikComponents/FormikControl'

const AddEditFeeComponent = ({ data }) => {

    const [selectedOption, setselectedOption] = useState(null)
    const [options, setOptions] = useState([])
    const [showMemberErrorMsg, setShowMemberErrorMsg] = useState(false)
    const [Member, setMember] = useState(0)


    const handleChange = (selectedOption) => {

        if (showMemberErrorMsg) {
            setShowMemberErrorMsg(false);
        }

        setselectedOption(selectedOption);
        setMember(selectedOption.value);

        if (selectedOption.value != 0) {
            axios.get(`${API_URL}/api/Member/MemberFeeInfo/${selectedOption.value}`)
                .then(res => {
                    setFeeInfo(res.data);
                })
        } else {
            setFeeInfo({ amount: 0, trainerFee: 0, membershipFee: 0, membership_Date: '', contactNo: '', dueFee : 0 });
        }
        // console.log('e.target.value == ', e.target.value);



        console.log('Selected Option Id == ', selectedOption.value);
    };



    const [Id, setId] = useState(0)

    const [startDate, setStartDate] = useState(new Date());



    useEffect(
        () => {
            console.log('calling setMemberDropdownOptions');
            GetMembers()
                .then(res => {
                    // setMemberDropdownOptions(res.data);
                    res.data.map(member => {
                        setOptions(prevState => [...prevState, { label: `${member.name}, ID : ${member.id}`, value: `${member.id}` }]);
                    })

                })
        }, []
    )

    const initialValues = {
        Amount_Received : ''
    }

    console.log('data == ', data);

    const isAddMode = data == '';

    useEffect(() => {
        if (!isAddMode) {
            setId(data.id);
            setMember(data.member_Id);

            initialValues.Amount_Received = data.amount_Received;

            setFeeInfo({ amount: data.amount, trainerFee: data.trainerFee, membershipFee: data.membershipFee, membership_Date: data.membership_Date, contactNo: data.contactNo , dueFee  : data.dueFee });

            setselectedOption({ label: `${data.memberName} ,ID : ${data.member_Id}`, value: `${data.member_Id}` });

            setStartDate(new Date(data.receiving_Date));
        }
    }, [])



    //   const { id } = useParams();


    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState('')


    const router = useRouter();

    const validationSchema = Yup.object().shape({
        Amount_Received : Yup.string().required('Required')
    })

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

        console.log('selectedOption -------*** ', selectedOption);


        var UserObj = Cookie.get("UserObj");


        console.log('UserObj == ', UserObj);


        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/fees/create');
        } else {

            console.log('values == ', values);


            if (Member == 0) {
                setShowMemberErrorMsg(true);
            } else {

                if (!isAddMode) {
                    values.Created_By = data.created_By;
                }
                else {
                    console.log('UserObj == ', JSON.parse(UserObj).id);
                    values.Created_By = JSON.parse(UserObj).id;
                }

                values.Receiving_Date = formatDate(startDate);
                values.Member_Id = Member;

                console.log('Values $$$$$$$$', values);


                if (isAddMode) {
                    setLoading(true)

                    setTimeout(() => {

                        console.log('values--- ', values);


                        PostFee(values).then(
                            () => {
                                setLoading(false)

                                toast.success('Fee created successfully', { position: toast.POSITION.TOP_RIGHT });

                                router.push('/fees');

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


                        UpdateFee(Id, values).then(
                            () => {
                                setHasErrors('')
                                setLoading(false)

                                toast.success('Fee updated successfully', { position: toast.POSITION.TOP_RIGHT });

                                router.push('/fees');

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

    const [feeInfo, setFeeInfo] = useState({ amount: 0, trainerFee: 0, membershipFee: 0, membership_Date: '', contactNo: '', dueFee : 0 })





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

                                        {!isAddMode ? <h3 className=''>Update Fee</h3> : <h3 className=''>Receive Fee</h3>}
                                        <button
                                            type='button'
                                            className='btn btn-primary d-flex'
                                            onClick={() => { router.push('/fees') }}
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
                                        <h6>Select Member </h6>
                                        <Select
                                            value={selectedOption}
                                            onChange={handleChange}
                                            options={options}
                                        />
                                        {showMemberErrorMsg ? (
                                            <div className='text-danger'>{'Required'}</div>
                                        ) : ''}


                                    </div>

                                    <FormikControl
                                        control='input'
                                        type='number'
                                        label='Amount Received'
                                        name='Amount_Received'
                                        className='m-3'
                                    />



                                    <div className='m-3'>


                                        <h6>Receiving Date </h6>
                                        <div className='d-flex'>
                                            <DateView
                                                className="form-control"
                                                // name='startDate'
                                                id='dt1'
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart
                                                startDate={startDate}
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





                                    {feeInfo.amount !== 0 &&
                                        <div className=' bg-light justify-content-center d-flex flex-wrap'>

                                            <span className='text-muted fw-bolder m-2'>Membership Date  :: </span><span className='text-muted  m-2'>{new Date(feeInfo.membership_Date).toLocaleDateString()}</span>
                                            <span className='text-muted fw-bolder m-2'>Contact :: </span><span className='text-muted m-2'>{feeInfo.contactNo ? feeInfo.contactNo : '--'}</span>
                                            <span className='text-muted fw-bolder m-2'>Due Fee :: </span><span className='text-muted m-2'>{feeInfo.dueFee ? feeInfo.dueFee : '--'}</span>
                                            <span className='text-muted fw-bolder m-2'>Trainer Fee :: </span><span className='text-muted m-2'>{feeInfo.trainerFee}</span>
                                            <span className='text-muted fw-bolder m-2'> Membership Fee :: </span><span className='text-muted m-2'>{feeInfo.membershipFee}</span>
                                            <span className='text-muted fw-bolder m-2'>Total Fee :: </span><span className='text-muted m-2'>{feeInfo.amount}</span>



                                        </div>
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

export default AddEditFeeComponent
