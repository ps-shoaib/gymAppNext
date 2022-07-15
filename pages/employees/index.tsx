import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Card, Button, Table, Modal, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ErrorResponseModel } from '../../src/models/errorViewModels/ErrorResponseModel'
import { ErrorModel } from '../../src/models/errorViewModels/ErrorModel'
// import FullPageLoader from '../../FullPageLoader'
import { useRouter } from 'next/router'
import { API_URL } from 'src/Services/authService'

import { Agent } from 'https'
import { GetEmployees, DeleteEmployee } from 'src/Services/EmployeeService'

import icon1 from '../../assets/svgs/art005.svg'
import icon2 from '../../assets/svgs/gen027.svg'
import icon3 from '../../assets/svgs/arr075.svg'

import { parseCookies } from 'src/parseCookies'

import Cookie from 'js-cookie'

import Image from 'next/image'

const AllEmployees = ({ data }) => {

    const router = useRouter();

    const [loading, setLoading] = useState(true)

    const [hasErrors, setHasErrors] = useState('')

    const [Employees, SetEmployees] = useState([])
    // const { data } = await GetEmployees();

    const GetAllEmps = () => {
        GetEmployees()
            .then(res => {
                SetEmployees(res.data);
            })
            .catch(err => {

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

    const [isManager, setIsManager] = useState(false)

    useEffect(() => {

        var UserObj = Cookie.get("UserObj");


        console.log('UserObj == ', UserObj);





        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/employees');
        } else {

            setIsManager(JSON.parse(UserObj).role == 'Manager');

            GetAllEmps();
        }

    }, [])


    
    // const Employees = data;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [IdtoBDeleted, setIdtoBDeleted] = useState(0);

    const handleShow = (id: number) => {
        console.log('id in handleShow---', id);

        setShow(true);
        setIdtoBDeleted(id);

    };

    const [showDeleteSpinner, SetshowDeleteSpinner] = useState(false);

    function handleDelete() {

        console.log('id in handle Delete---', IdtoBDeleted);
        SetshowDeleteSpinner(true);
        var UserObj = Cookie.get("UserObj");

        let DeletedBy = '';
        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/employees');
        } else {
            DeletedBy = JSON.parse(UserObj).id;
        }


        DeleteEmployee(IdtoBDeleted, DeleteEmployee)
            .then(res => {
                console.log('res from DeleteEmployee----', res);
                handleClose();

                SetshowDeleteSpinner(false);

                GetAllEmps();

                toast.warning('Employee deleted successfully', { position: toast.POSITION.TOP_RIGHT });

                router.push('/employees');

            })
            .catch(err => {
                console.log('err from DeleteEmployee', err);
                SetshowDeleteSpinner(false);
                toast.error('Error in Deleting Employee, try again after Deleting this Employee\'s data from other Modules.', { position: toast.POSITION.TOP_RIGHT });

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
                                <span className='card-label  fs-3 mb-1'>All Employees</span>
                                {/* <span className='text-muted mt-1 fw-bold fs-7'>All Offices in our PlatForm</span> */}
                            </h3>
                            <div className='card-toolbar'>
                                <a className='btn btn-sm btn-primary m-1 p-2 d-flex'
                                    onClick={() => router.push('/employees/create')}
                                    style={{'pointerEvents' : isManager ? 'none' : 'auto'}}
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
                                            <th className='ps-4 w-150px'>Email</th>
                                            <th className='ps-4 w-150px'>Phone</th>

                                            <th className='ps-4 w-150px'>Category</th>


                                            <th className='w-100px'>Actions</th>

                                            {/* text-end rounded-end */}
                                        </tr>
                                    </thead>
                                    {/* end::Table head */}
                                    {/* begin::Table body */}
                                    <tbody>

                                        {/* (SetSpacetypes : {id : number, name : string}[]) => ( */}
                                        {
                                            Employees.map(
                                                (system: {
                                                    id: number, name: string, email: string, phone: string, category: string
                                                    // , createdOn: string, isActive : boolean
                                                }, index) => (
                                                    <tr key={system.id}>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{index + 1}</td>



                                                        {/* <h5>Date............{date..format('DD-MM-YYYY')}</h5> */}


                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.name}</td>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.email}</td>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.phone}</td>

                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.category}</td>


                                                        {/* Employees/create-role/:id */}

                                                        <td className='ps-4 w-100px'>


                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Edit Employee
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >

                                                                <a
                                                                    className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                                    onClick={() => router.push(`/employees/edit/${system.id}`)}
                                                                    // style={{'pointerEvents' : isManager ? 'none' : 'auto'}}
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
                                                                    // style={{'pointerEvents' : isManager ? 'none' : 'auto'}}
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
                                {/* end::Table */}

                                <Modal show={show} onHide={handleClose} className='m-5 bg-light bg-opacity-10'>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are You sure to want to delete this Employee
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

export default AllEmployees



// export async function getServerSideProps(context) {





//     const { data } = await GetEmployees();

//     console.log('data from All Employees == ', data);

//     let CookieObj = parseCookies(context.req);



//     if (Object.keys(CookieObj).length == 0) {
//         return {
//             redirect: {
//                 destination: '/login?callbackUrl=https://gym-app.ps-beta.com/employees',
//                 permanent: false
//             }
//         }
//     }


//     return {
//         props: {
//             data: data
//         }
//     }




// }