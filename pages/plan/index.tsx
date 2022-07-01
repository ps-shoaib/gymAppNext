import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Card, Button, Table, Modal, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import FullPageLoader from '../../FullPageLoader'
import { useRouter } from 'next/router'
import { GetPlans, DeletePlan } from 'src/Services/plansService'
import Image from 'next/image'
import icon1 from '../../assets/svgs/art005.svg'
import icon2 from '../../assets/svgs/gen027.svg'
import icon3 from '../../assets/svgs/arr075.svg'
import { parseCookies } from '../../src/parseCookies'



const AllPlans = ({ data }) => {

    const router = useRouter();

    const [loading, setLoading] = useState(true)

    const [hasErrors, setHasErrors] = useState('')

    const [Plans, SetPlans] = useState([])
    // const { data } = await GetPlans();
    useEffect(() => {

        GetAllPlans();

    }, [])

    const GetAllPlans = () => {
        GetPlans()
            .then(res => {
                SetPlans(res.data)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })

    }


    // const Plans = data;

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


        DeletePlan(IdtoBDeleted)
            .then(res => {
                console.log('res from DeletePlan----', res);
                handleClose();

                SetshowDeleteSpinner(false);
                GetAllPlans();
                toast.warning('Plan deleted successfully', { position: toast.POSITION.TOP_RIGHT });

                router.push('/plan');

            })
            .catch(err => {
                console.log('err from DeletePlan', err);
                SetshowDeleteSpinner(false);
                toast.error('Error in deleting Plan', { position: toast.POSITION.TOP_RIGHT });

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
                                <span className='card-label  fs-3 mb-1'>All Membership Plans</span>
                                {/* <span className='text-muted mt-1 fw-bold fs-7'>All Offices in our PlatForm</span> */}
                            </h3>
                            <div className='card-toolbar'>
                                <a className='btn btn-sm btn-primary m-1 p-2 d-flex'
                                    onClick={() => router.push('/plan/create')}
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
                                            <th className='ps-4 w-150px'>Registration Fee</th>
                                            <th className='ps-4 w-150px'>Membership Fee</th>
                                            <th className='ps-4 w-150px'>Note</th>


                                            <th className='w-100px'>Actions</th>

                                            {/* text-end rounded-end */}
                                        </tr>
                                    </thead>
                                    {/* end::Table head */}
                                    {/* begin::Table body */}
                                    <tbody>

                                        {/* (SetSpacetypes : {id : number, name : string}[]) => ( */}
                                        {
                                            Plans.map(
                                                (system: {
                                                    id: number, name: string, membershipFee: number, note: string, registrationFee: string
                                                    // , createdOn: string, isActive : boolean
                                                }, index) => (
                                                    <tr key={system.id}>



                                                        {/* <h5>Date............{date..format('DD-MM-YYYY')}</h5> */}

                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{index + 1}</td>

                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.name}</td>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.registrationFee}</td>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.membershipFee}</td>
                                                        <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.note}</td>

                                                        {/* Plans/create-role/:id */}

                                                        <td className='ps-4 w-100px'>


                                                            <OverlayTrigger
                                                                delay={{ hide: 450, show: 300 }}
                                                                overlay={(props) => (
                                                                    <Tooltip id={''} {...props}>
                                                                        Edit Plan
                                                                    </Tooltip>
                                                                )}
                                                                placement="top"
                                                            >

                                                                <a
                                                                    // className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                                    className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                                    onClick={() => router.push(`/plan/edit/${system.id}`)}
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
                                {/* end::Table */}
                                <div className='mt-5'>
                                    <Modal show={show} onHide={handleClose} className='mt-5 bg-light bg-opacity-10'>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Delete Confirmation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are You sure to want to delete this Plan
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

export default AllPlans


// export const getServerSideProps = async (context) => {


//     const { data } = await GetPlans();

//     console.log('data from All Plans == ', data);



//     let CookieObj = parseCookies(context.req);



//     if (Object.keys(CookieObj).length == 0) {
//         return {
//             redirect: {
//                 destination: '/login?callbackUrl=https://gym-app.ps-beta.com/plan',
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

// export async function getServerSideProps(context) {





//     const { data } = await GetPlans();

//     console.log('data from All Plans == ', data);


//     return {
//         props: {
//             data: data
//         }
//     }




// }