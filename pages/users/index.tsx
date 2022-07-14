import React, { useState, useEffect, FormEvent } from 'react'
import axios from 'axios'
import { Card, Button, Table, Modal, Spinner, Tooltip, OverlayTrigger, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ErrorResponseModel } from 'src/models/errorViewModels/ErrorResponseModel'
import { ErrorModel } from 'src/models/errorViewModels/ErrorModel'
import { useRouter } from 'next/router'
import { DeleteUser, GetAllUsers } from 'src/Services/userService'
import { API_URL } from 'src/Services/authService'

import icon1 from '../../assets/svgs/art005.svg'
import icon2 from '../../assets/svgs/gen027.svg'
import icon3 from '../../assets/svgs/arr075.svg'
import icon4 from '../../assets/svgs/eyefill.svg'
import icon8 from '../../assets/svgs/file.svg'

import Cookie from 'js-cookie'

import Image from 'next/image'


const AllUsers = () => {


    const router = useRouter();

    const [loading, setLoading] = useState(true)

    const [hasErrors, setHasErrors] = useState('')

    const [users, SetUsers] = useState([{
        id: '',
        userName: '',
        email: '',
        // phoneNumber: '',
        // gender: '',
        // address: '',
        role: '',
        // isVerified: false,
        // isHost: false
    }])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [IdtoBDeleted, setIdtoBDeleted] = useState('');

    const [showDeleteSpinner, SetshowDeleteSpinner] = useState(false);

    const handleShow = (id: string) => {
        console.log('id in handleShow---', id);

        setShow(true);
        setIdtoBDeleted(id);

    };



    const [search, setSearch] = React.useState('');





    const data = {
        nodes: search.length === 0 || search === 'select'
            ? users
            : users.filter(item =>
                item.userName?.toLocaleLowerCase().includes(search) ||
                //  item.phoneNumber?.includes(search) ||
                item.email?.toLocaleLowerCase().includes(search)
                // || item.gender?.includes(search) ||
                // item.address?.toLocaleLowerCase().includes(search)
            )

    }



    function handleDelete() {

        console.log('id in handle Delete---', IdtoBDeleted);
        SetshowDeleteSpinner(true);

        DeleteUser(IdtoBDeleted)
            .then(res => {
                SetshowDeleteSpinner(false);
                handleClose();

                toast.warning('User deleted successfully', { position: toast.POSITION.TOP_RIGHT });

                GetUsers();
            })
            .catch(err => {

                handleClose();

                SetshowDeleteSpinner(false);

                toast.error('Error in Deleting User', { position: toast.POSITION.TOP_RIGHT });

            })

    };

    const GetUsers = () => {

        setLoading(true);
        GetAllUsers()
            .then(res => {
                console.log('res from AllUsers----', res);
                SetUsers(res.data)

                setLoading(false);
            })
            .catch(err => {
                setLoading(false);

                console.log('err from GetAllTypesNames', err);

                let Obj: ErrorResponseModel = err.toJSON();

                console.log(Obj.message);


                if (Obj.message === 'Network Error') {
                    setHasErrors('API Server is down....')
                }
                else {
                    let obj2: ErrorModel = JSON.parse(Obj.message);
                    setHasErrors(obj2.errorMessage);
                }

            })
    }


    useEffect(
        () => {
            var UserObj = Cookie.get("UserObj");


            console.log('UserObj == ', UserObj);


            if (UserObj == undefined) {
                router.push('/login?callbackUrl=https://gym-app.ps-beta.com/users');
            } else {


                GetUsers()
            }
        }, []
    )


    const [showLogMsgs, setShowLogMsgs] = useState(false);

    const handleCloseModal = () => setShowLogMsgs(false);

    const [logMsgs, setLogMsgs] = useState([{ id: 0, logMsg: '' }])


    const handleShowMembersLog = (id: string) => {
        console.log('id in handleShow4---', id);
        setShowLogMsgs(true);

        axios.get(`${API_URL}/api/Log/ManagerLogs/${id}`)
            .then(res => {
                setLogMsgs(res.data);
            })


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
                                <span className='card-label  fs-3 mb-1'>All Users</span>
                                {/* <span className='text-muted mt-1 fw-bold fs-7'>All Offices in our PlatForm</span> */}
                            </h3>
                            <div className='card-toolbar'>
                                <a className='btn btn-sm btn-primary m-1 p-2 d-flex'
                                    onClick={() => router.push('/users/create')}
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
                                    // <div className='d-flex justify-content-center'>
                                    //     <Spinner animation="border" role="status" className='m-5'>
                                    //         <span className="visually-hidden">Loading...</span>
                                    //     </Spinner>
                                    // </div>
                                    // <FullPageLoader />
                                } */}
                                {/* begin::Table */}
                                <div className=' m-1 p-1 d-flex '>
                                    {/* <div className='mt-5 pt-5'> */}

                                    <input
                                        type='text'
                                        onChange={(event) => setSearch(event.target.value)}
                                        className='form-control border-2 rounded  bg-light'
                                        placeholder='Search...'
                                        style={{ 'marginRight': '20px' }}
                                    />
                                    {/* </div> */}

                                </div>



                                <table className='table align-middle gs-0 gy-4'>
                                    {/* begin::Table head */}
                                    <thead>
                                        <tr className='fw-bolder w-250px text-muted bg-light'>
                                            {/* <th className='ps-4 min-w-300px rounded-start'>Agent</th> */}
                                            <th className='ps-4 w-200px'>Name</th>

                                            <th className='ps-4 w-200px'>Email</th>


                                            <th className='w-100px'>Actions</th>

                                            {/* text-end rounded-end */}
                                        </tr>
                                    </thead>
                                    {/* end::Table head */}
                                    {/* begin::Table body */}
                                    <tbody>

                                        {/* (SetSpacetypes : {id : number, name : string}[]) => ( */}
                                        {
                                            data.nodes!.map(
                                                (system) => (
                                                    <tr key={system.id}>

                                                        <td className='ps-4 w-200px text-dark  text-hover-primary'>
                                                            <>
                                                                {system.userName}

                                                                <span className='text-muted  text-muted fs-7'>
                                                                    {system.role && <span>({system.role})</span>}
                                                                </span>

                                                            </>
                                                        </td>

                                                        <td className='ps-4 w-200px text-dark text-hover-primary'> {system.email}</td>





                                                        <td className='ps-4 w-100px'>

                                                            {/* {system.roles.length > 0 && */}
                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Edit User
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >
                                                                <a
                                                                    className='btn btn-icon btn-bg-light mb-1 btn-active-color-warning btn-sm me-1'
                                                                    onClick={() => router.push(`/users/edit/${system.id}`)}
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
                                                            {/* } */}


                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Delete
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >
                                                                <a
                                                                    className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
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
                                                            {system.role == "Manager" &&

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
                                                                        // className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                                        className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
                                                                        onClick={() => handleShowMembersLog(system.id)}



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
                                                            }


                                                        </td>

                                                    </tr>

                                                ))
                                        }

                                    </tbody>
                                    {/* end::Table body */}
                                </table>
                                <Modal show={show} onHide={handleClose} className='mt-5'>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are You sure to want to delete this User
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


                                <Modal show={showLogMsgs} onHide={handleCloseModal} className='mt-5 bg-light bg-opacity-10'>
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

export default AllUsers 
