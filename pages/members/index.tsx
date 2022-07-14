import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Card, Button, Table, Modal, Spinner, Tooltip, OverlayTrigger, Form, FormLabel } from 'react-bootstrap'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ErrorResponseModel } from '../../src/models/errorViewModels/ErrorResponseModel'
import { ErrorModel } from '../../src/models/errorViewModels/ErrorModel'
// import FullPageLoader from '../../FullPageLoader'
import { useRouter } from 'next/router'
import { API_URL } from 'src/Services/authService'

import { Agent } from 'https'

import icon1 from '../../assets/svgs/art005.svg'
import icon2 from '../../assets/svgs/gen027.svg'
import icon3 from '../../assets/svgs/arr075.svg'
import icon4 from '../../assets/svgs/eyefill.svg'
import icon5 from '../../assets/svgs/fillCheck.svg'
import icon6 from '../../assets/svgs/arrowLeft.svg'

import icon7 from '../../assets/svgs/calendar.svg'
import icon8 from '../../assets/svgs/file.svg'
import icon9 from '../../assets/svgs/x-square-fill.svg'
import icon10 from '../../assets/svgs/check_icon.svg'

import { GetTrainers } from 'src/Services/MemberService'

import DateView from 'react-datepicker'

import Cookie from 'js-cookie'

import Image from 'next/image'
import { DeleteMember, GetMembers } from 'src/Services/MemberService'
import { MemberListingModel } from 'src/models/MembersModels/MemberListingModel'

import { GetPlans } from 'src/Services/plansService'


const AllMembers = ({ data }) => {

    const [startDate, setStartDate] = useState(new Date());


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

    const [TrainingFee, SetTrainingFee] = useState(0)
    const router = useRouter();

    const [loading, setLoading] = useState(true)

    const [hasErrors, setHasErrors] = useState('')

    const [Members, SetMembers] = useState<MemberListingModel[] | null>([])

    // console.log('data In All Members== ', data);
    // const { data } = await GetMembers();

    useEffect(() => {



        var UserObj = Cookie.get("UserObj");


        console.log('UserObj == ', UserObj);


        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/members');
        } else {




            AllMembers();
        }

    }, [])

    const AllMembers = () => {
        GetMembers()
            .then(res => {
                SetMembers(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);

                let Obj = err.toJSON();
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

                    toast.error(Obj.message, { position: toast.POSITION.BOTTOM_RIGHT });

                    setHasErrors(obj2.errorMessage);

                }
            })
    }

    // const Members: [MemberListingModel] = data;


    const [search, setSearch] = React.useState('');

    const FilteredMembers = {
        nodes: search.length === 0
            ? Members
            : Members.filter(item =>
                item.name?.toLowerCase().includes(search.toLowerCase()) || item.plan_Name?.toLowerCase().includes(search.toLowerCase()) ||
                item.phoneNumber?.toLowerCase().includes(search.toLowerCase()) || item.trainerName?.toLowerCase().includes(search.toLowerCase()) ||
                item.trainingFee?.toString().includes(search)
            )

    }



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);

    const [memberIdtoBRejoin, setMemberIdtoBRejoin] = useState(0);

    const [IdtoBDeleted, setIdtoBDeleted] = useState(0);

    const handleShow2 = (id: number) => {
        console.log('id in handleShow2---', id);

        setShow2(true);
        setMemberIdtoBRejoin(id);

    };
    //------------------------------------------
    const [show4, setShow4] = useState(false);

    const handleClose4 = () => setShow4(false);

    const [logMsgs, setLogMsgs] = useState([{ id: 0, logMsg: '' }])

    const handleShow4 = (id: number) => {
        console.log('id in handleShow4---', id);
        setShow4(true);

        axios.get(`${API_URL}/api/Log/LogsByMember/${id}`)
            .then(res => {
                setLogMsgs(res.data);
            })


    };


    //----------------------------------
    const [show3, setShow3] = useState(false);

    const handleClose3 = () => setShow3(false);

    const [memberIdtoBUpdated, setMemberIdtoBUpdated] = useState(0);


    const [showDeactivateSpinner, SetShowDeactivateSpinner] = useState(false);


    const [UpdateStatus, setUpdateStatus] = useState(false);

    const handleShow3 = (id: number, status: boolean) => {
        console.log('id in handleShow---', id);
        setShow3(true);
        setUpdateStatus(!status);
        setMemberIdtoBUpdated(id);
    };


    function handleUpdateStatus() {





        console.log('id in handleUpdateStatus ---', memberIdtoBUpdated);
        SetShowDeactivateSpinner(true);

        const values = { Id: memberIdtoBUpdated, ActiveStatus: UpdateStatus, UpdatedBy: '' };


        var UserObj = Cookie.get("UserObj");

        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/members');
        } else {
            console.log('UserObj == ', JSON.parse(UserObj).id);

            values.UpdatedBy = JSON.parse(UserObj).id;


            axios.put(`${API_URL}/api/Member/UpdateStatus/${memberIdtoBUpdated}`, values)
                .then(res => {
                    console.log('res from Update Member----', res);
                    handleClose3();

                    SetShowDeactivateSpinner(false);
                    AllMembers();
                    toast.warning('Member Updated successfully', { position: toast.POSITION.TOP_RIGHT });

                    router.push('/members');

                })
                .catch(err => {
                    console.log('err from Update Member', err);
                    SetShowDeactivateSpinner(false);
                    toast.error('Error in Updating Member', { position: toast.POSITION.TOP_RIGHT });

                })

        }


    };



    const [showRejoinSpinner, SetShowRejoinSpinner] = useState(false);


    const handleShow = (id: number) => {
        console.log('id in handleShow---', id);
        setShow(true);
        setIdtoBDeleted(id);
    };

    const [showDeleteSpinner, SetshowDeleteSpinner] = useState(false);

    function handleDelete() {

        console.log('id in handle Delete---', IdtoBDeleted);
        SetshowDeleteSpinner(true);


        DeleteMember(IdtoBDeleted)
            .then(res => {
                console.log('res from DeleteMember----', res);
                handleClose();

                SetshowDeleteSpinner(false);
                AllMembers();
                toast.warning('Member deleted successfully', { position: toast.POSITION.TOP_RIGHT });

                router.push('/members');

            })
            .catch(err => {
                console.log('err from DeleteMember', err);
                SetshowDeleteSpinner(false);
                toast.error('Error in deleting Member', { position: toast.POSITION.TOP_RIGHT });

            })
    };


    function handleRejoin() {

        if (Plan == 0) {
            setshowPlansErrorMsg(true);
        } else {

            if (isTrainerRequired && TrainerType === 0) {
                setshowTrainerTypeErrorMsg(true);
                setLoading(false);
            }
            else {




                console.log('id in handle Rejoin ---', memberIdtoBRejoin);
                SetShowRejoinSpinner(true);

                const values = {
                    UpdatedBy: '', Id: memberIdtoBRejoin, Plan_Id: Plan, Is_Trainer_Required: isTrainerRequired,
                    CreatedOn: formatDate(startDate), Employee_Id: 0, TrainingFee: 0
                };

                var UserObj = Cookie.get("UserObj");


                if (UserObj == undefined) {
                    router.push('/login?callbackUrl=https://gym-app.ps-beta.com/members');
                } else {
                    values.UpdatedBy = JSON.parse(UserObj).id;

                    if (isTrainerRequired == true) {
                        values.Employee_Id = TrainerType;
                        values.TrainingFee = TrainingFee;
                    } else {
                        values.Employee_Id = null;
                        values.TrainingFee = 0;
                    }


                    axios.put(`${API_URL}/api/Member/Rejoin/${memberIdtoBRejoin}`, values)
                        .then(res => {
                            console.log('res from Member Rejoin----', res);
                            handleClose2();

                            SetShowRejoinSpinner(false);
                            AllMembers();
                            toast.warning('Member Rejoined successfully', { position: toast.POSITION.TOP_RIGHT });

                            router.push('/members');

                        })
                        .catch(err => {
                            console.log('err from Member Rejoin', err);
                            SetShowRejoinSpinner(false);
                            toast.error('Error in Member Rejoin', { position: toast.POSITION.TOP_RIGHT });

                        })
                }

            }
        }

    };




    return (
        <>
            <div className="d-flex flex-wrap">
                <>

                    {/* --------------------------------------------------------------------------------- */}
                    <div className={'card mb-5 mb-xl-4 w-100'}>



                        {/* begin::Header */}
                        <div className='card-header border-0 pt-5 d-flex justify-content-between'>
                            <h3 className='card-title align-items-start flex-column'>
                                <span className='card-label  fs-3 mb-1'>All Members</span>
                                {/* <span className='text-muted mt-1 fw-bold fs-7'>All Offices in our PlatForm</span> */}
                            </h3>
                            <div className='card-toolbar'>
                                <a className='btn btn-sm btn-primary m-1 p-2 d-flex'
                                    onClick={() => router.push('/members/create')}
                                >
                                    <Image
                                        src={icon3}
                                        alt={icon3}
                                        width="23"
                                        height="23"
                                        className="roundedCircle"
                                    />
                                    <span className='p-1'> New </span>
                                </a>

                            </div>
                        </div>

                        <div className=' m-2 p-1 d-flex '>
                            {/* <div className='mt-5 pt-5'> */}

                            <input
                                type='text'
                                onChange={(event) => setSearch(event.target.value)}
                                className='form-control border-2 rounded  bg-light'
                                placeholder='Search...'
                                style={{ 'marginRight': '20px', 'marginLeft': '20px' }}
                            />
                        </div>

                        {/* end::Header */}
                        {/* begin::Body */}
                        <div className='card-body py-3'>
                            {/* begin::Table container */}
                            <div className='table-responsive'>
                                {hasErrors ? (
                                    <div className='mb-lg-15 alert alert-danger'>
                                        <div className='alert-text font-weight-bold'>{hasErrors}</div>
                                    </div>
                                ) : ''}

                                {/* {loading &&
                                    // <FullPageLoader />
                                } */}
                                {/* begin::Table */}

                                <table className='table align-middle gs-0 gy-4'>
                                    {/* begin::Table head */}
                                    <thead>
                                        <tr className=' w-250px text-muted bg-light'>
                                            {/* <th className='ps-4 min-w-300px rounded-start'>Agent</th> */}
                                            <th className='ps-4 w-150px'>#</th>

                                            <th className='ps-4 w-150px'>Name</th>
                                            <th className='ps-4 w-150px'>Plan Type</th>
                                            <th className='ps-4 w-150px'>Phone Number</th>

                                            <th className='ps-4 w-50px'>Trainer Required</th>

                                            <th className='ps-4 w-50px'>Status</th>


                                            {/* <th className='ps-4 w-150px'>Traniner</th>
                                            <th className='ps-4 w-150px'>Trainer Fee</th> */}



                                            <th className='w-100px'>Actions</th>

                                            {/* text-end rounded-end */}
                                        </tr>
                                    </thead>
                                    {/* end::Table head */}
                                    {/* begin::Table body */}
                                    <tbody>

                                        {/* (SetSpacetypes : {id : number, name : string}[]) => ( */}
                                        {
                                            FilteredMembers.nodes.map(
                                                (system, index) => (
                                                    <tr key={system.id}>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{index + 1}</td>



                                                        {/* <h5>Date............{date..format('DD-MM-YYYY')}</h5> */}


                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.name}</td>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.plan_Name}</td>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.phoneNumber ? system.phoneNumber : '--'}</td>

                                                        {/* email : string, gender : string, phoneNumber : string */}
                                                        <td className='ps-4 w-50px text-dark  text-hover-primary'>
                                                            <Form.Check
                                                                type="checkbox"
                                                                checked={system.is_Trainer_Required}
                                                                readOnly={true}
                                                            />
                                                        </td>
                                                        {/* <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.trainerName ? system.trainerName : 'No Trainer'}</td>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.trainingFee ? system.trainingFee : '--'}</td> */}

                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.activeStatus ? <Image
                                                            src={icon10}
                                                            alt={icon10}
                                                            width="23"
                                                            height="23"
                                                        className="roundedCircle"
                                                        /> : <Image
                                                            src={icon9}
                                                            alt={icon9}
                                                            width="23"
                                                            height="23"
                                                        className="roundedCircle"
                                                        />}</td>


                                                        <td className='ps-4 w-100px'>


                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Log Info
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >

                                                                <a
                                                                    className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                                    onClick={() => handleShow4(system.id)}

                                                                // onClick={
                                                                // () => router.push(`/members/details/${system.id}`)
                                                                // }
                                                                >
                                                                    <Image
                                                                        src={icon8}
                                                                        alt={icon8}
                                                                        width="23"
                                                                        height="23"
                                                                    // className="roundedCircle"
                                                                    />
                                                                </a>

                                                            </OverlayTrigger>


                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        {system.activeStatus ? 'Deactivated' : 'Activate'} Member
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >

                                                                <a
                                                                    className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                                    onClick={() => handleShow3(system.id, system.activeStatus)}

                                                                // onClick={
                                                                // () => router.push(`/members/details/${system.id}`)
                                                                // }
                                                                >
                                                                    <Image
                                                                        src={icon5}
                                                                        alt={icon5}
                                                                        width="23"
                                                                        height="23"
                                                                    // className="roundedCircle"
                                                                    />
                                                                </a>

                                                            </OverlayTrigger>

                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Rejoin
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >

                                                                <button
                                                                    disabled={system.activeStatus}

                                                                    className='btn btn-icon btn-bg-warning bg-light mb-1 btn-active-color-warning btn-sm me-1'
                                                                    onClick={() => handleShow2(system.id)}

                                                                >
                                                                    <Image
                                                                        src={icon6}
                                                                        alt={icon6}
                                                                        width="23"
                                                                        height="23"
                                                                        className="roundedCircle"
                                                                    />
                                                                </button>

                                                            </OverlayTrigger>




                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Member Details
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >

                                                                <a
                                                                    className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                                    onClick={() => router.push(`/members/details/${system.id}`)}
                                                                >
                                                                    <Image
                                                                        src={icon4}
                                                                        alt={icon4}
                                                                        width="23"
                                                                        height="23"
                                                                        className="roundedCircle"
                                                                    />
                                                                </a>

                                                            </OverlayTrigger>


                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Edit Member
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >

                                                                <a
                                                                    className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                                    onClick={() => router.push(`/members/edit/${system.id}`)}
                                                                >
                                                                    <Image
                                                                        src={icon1}
                                                                        alt={icon1}
                                                                        width="23"
                                                                        height="23"
                                                                        className="roundedCircle"
                                                                    />
                                                                </a>

                                                            </OverlayTrigger>


                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Delete {system.name}
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >
                                                                <a
                                                                    className='btn btn-icon btn-bg-danger btn-active-color-danger btn-sm'
                                                                    onClick={() => handleShow(system.id)}

                                                                >
                                                                    <Image
                                                                        src={icon2}
                                                                        alt={icon2}
                                                                        width="23"
                                                                        height="23"
                                                                        className="roundedCircle"
                                                                    />
                                                                </a>

                                                            </OverlayTrigger>



                                                        </td>

                                                    </tr>

                                                ))
                                        }

                                    </tbody>
                                    {/* end::Table body */}
                                </table>

                                {/* Delete Modal */}
                                <Modal show={show} onHide={handleClose} className='mt-5 bg-light bg-opacity-10'>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are You sure to want to delete this Member
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="danger" onClick={handleDelete}>
                                            <div className='d-flex'>
                                                Delete
                                                {showDeleteSpinner && (
                                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                                    </span>
                                                )}
                                            </div>
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* Rejoin Modal */}
                                <Modal show={show2} onHide={handleClose2} className='mt-5 bg-light bg-opacity-10'>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Rejoin Member</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <div className='m-2 w-100'>
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
                                                // disabled={!isAddMode}
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
                                                            src={icon7}
                                                            alt={icon7}
                                                            width="23"
                                                            height="23"
                                                        // className="roundedCircle"
                                                        />


                                                    </span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className='m-2 mb-3'
                                        // style={{ 'minWidth': '310px' }}
                                        >

                                            <FormLabel>Select Membership Plan</FormLabel>

                                            <Form.Select
                                                value={Plan}
                                                onChange={(e) => HandlePlansChange(e)}
                                                isInvalid={showPlansErrorMsg}
                                            >
                                                <option key='select' value={'0'}>Select Plan</option>
                                                {PlansDropdownOptions.map((system) =>
                                                    <option key={system.id} value={system.id}>{system.name}</option>
                                                )}
                                            </Form.Select>
                                            {showPlansErrorMsg ? (
                                                <div className='text-danger'>{'Required'}</div>
                                            ) : ''}

                                        </div>


                                        <div className='p-2 m-2'>
                                            <Form.Check
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

                                                    <Form.Select
                                                        value={TrainerType}
                                                        onChange={(e) => HandleTrainerTypeChange(e)}
                                                        isInvalid={showTrainerTypeErrorMsg}
                                                    >
                                                        <option key='select' value={'0'}>Select Type</option>
                                                        {TrainerTypeDropdownOptions.map((system) =>
                                                            <option key={system.id} value={system.id}>{system.name}</option>
                                                        )}
                                                    </Form.Select>
                                                    {showTrainerTypeErrorMsg ? (
                                                        <div className='text-danger'>{'Required'}</div>
                                                    ) : ''}

                                                </div>

                                                <div className='m-2'>

                                                    <FormLabel>Training Fee</FormLabel>
                                                    <input type={'number'}
                                                        // label='Training Fee'
                                                        value={TrainingFee}
                                                        onChange={(e) => SetTrainingFee(parseInt(e.target.value))}
                                                        name='TrainingFee'
                                                        className='form-control'
                                                    />
                                                </div>

                                                {/* <FormikControl
                                                control='input'
                                                type='number'
                                                label='Training Fee'
                                                name='TrainingFee'
                                                className='m-2'
                                            /> */}

                                            </>
                                        }

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="danger" onClick={handleRejoin}>
                                            <div className='d-flex'>
                                                Rejoin
                                                {showRejoinSpinner && (
                                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                                    </span>
                                                )}
                                            </div>
                                        </Button>
                                    </Modal.Footer>
                                </Modal>




                                {/* Deactivate Member Modal */}
                                <Modal show={show3} onHide={handleClose3} className='mt-5 bg-light bg-opacity-10'>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are You sure to want to Update the status of Member
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose3}>
                                            Cancel
                                        </Button>
                                        <Button variant="danger" onClick={handleUpdateStatus}>
                                            <div className='d-flex'>
                                                Toggle Status
                                                {showDeactivateSpinner && (
                                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                                    </span>
                                                )}
                                            </div>
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* Log msgs Modal */}
                                <Modal show={show4} onHide={handleClose4} className='mt-5 bg-light bg-opacity-10'>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Log Info of Member</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        {logMsgs.map(log => (
                                            <>
                                                <div className='m-2 bg-light border p-2 border-1'>
                                                    {log.logMsg}
                                                </div>
                                            </>
                                        ))}
                                    </Modal.Body>

                                </Modal>



                                {/* end::Table */}
                            </div>
                            {/* end::Table container */}
                        </div>
                        {/* begin::Body */}
                    </div>
                    {/* ---------------------------------------------------------------- */}
                    {/* ---------------------------------------------------------------- */}

                </>

            </div >
        </>
    )

}

export default AllMembers



// export async function getServerSideProps(context) {





//     const { data } = await GetMembers();

//     console.log('data from All Members == ', data);


//     return {
//         props: {
//             data: data
//         }
//     }




// }