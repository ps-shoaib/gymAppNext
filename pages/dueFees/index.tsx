import React, { useState, useEffect } from 'react'

import { Card, Button, Table, Modal, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import FullPageLoader from '../../FullPageLoader'
import { useRouter } from 'next/router'


import icon4 from '../../assets/svgs/eyefill.svg'


import Image from 'next/image'
import { GetAllDueFees } from 'src/Services/FeeService'
import { DueFeeModel } from 'src/models/DueFeesViewModels/DueFeesModel'

import Cookie from 'js-cookie'

const AllDueFees = ({ data }) => {

    const router = useRouter();

    const [loading, setLoading] = useState(true)

    const [hasErrors, setHasErrors] = useState('')

    const GetDueFees = () => {

        GetAllDueFees()
            .then(res => {
                SetFees(res.data);
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

    const [DueFees, SetFees] = useState<DueFeeModel[] | null>([])
    // const { data } = await GetAllDueFees();
    useEffect(() => {

        var UserObj = Cookie.get("UserObj");


        console.log('UserObj == ', UserObj);


        if (UserObj == undefined) {
            router.push('/login?callbackUrl=https://gym-app.ps-beta.com/dueFees');
        } else {
        
        GetDueFees();
        }
    }, [])


    // const DueFees : DueFeeModel[] = data;







    return (
        <div className="d-flex flex-wrap">

            {/* --------------------------------------------------------------------------------- */}
            <div className={'card mb-5 mb-xl-4 w-100'}>


                {/* begin::Header */}
                <div className='card-header border-0 pt-5 d-flex justify-content-between'>
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label  fs-3 mb-1'>All Due Fees</span>
                        {/* <span className='text-muted mt-1 fw-bold fs-7'>All Offices in our PlatForm</span> */}
                    </h3>
                    {/* <div className='card-toolbar'>
                                <a className='btn btn-sm btn-primary m-1 p-2 d-flex'
                                    onClick={() => router.push('/fees/create')}
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

                            </div> */}
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

                                    <th className='ps-4 w-150px'>Due Date</th>

                                    <th className='ps-4 w-150px'>Member</th>

                                    <th className='ps-4 w-150px'>Member Contact No</th>

                                    <th className='ps-4 w-150px'>Member Email</th>


                                    <th className='ps-4 w-150px'>Paid Fee</th>

                                    <th className='ps-4 w-150px'>Due Fee</th>

                                    <th className='w-100px'>Actions</th>

                                    {/* text-end rounded-end */}
                                </tr>
                            </thead>
                            {/* end::Table head */}
                            {/* begin::Table body */}
                            <tbody>

                                {/* (SetSpacetypes : {id : number, name : string}[]) => ( */}
                                {
                                    DueFees.map(
                                        (system, index) => (
                                            <tr key={system.id}>
                                                <td className='ps-4 w-150px text-dark  text-hover-primary'>{index + 1}</td>



                                                {/* <h5>Date............{date..format('DD-MM-YYYY')}</h5> */}


                                                <td className='ps-4 w-150px text-dark  text-hover-primary'>{new Date(system.receiving_Date).toDateString()}</td>
                                                <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.member_Name}</td>

                                                <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.member_PhoneNumber}</td>
                                                <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.member_Email}</td>



                                                <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.trainer_Fee_Received + system.membership_Fee_Received + (system.isAdmissionFee_Received ? 2000 : 0)}
                                                    <span className='text-muted' >
                                                        {system.isAdmissionFee_Received ? '( + ADM Fee)' : ''}
                                                    </span></td>

                                                <td className='ps-4 w-150px text-dark  text-hover-primary'>{system.dueFee}</td>


                                                {/* DueFees/create-role/:id */}

                                                <td className='ps-4 w-100px'>


                                                    <OverlayTrigger
                                                        delay={{ hide: 450, show: 300 }}
                                                        overlay={(props) => (
                                                            <Tooltip id={''} {...props}>
                                                                Due Fee Details
                                                            </Tooltip>
                                                        )}
                                                        placement="top"
                                                    >

                                                        <a
                                                            className='btn btn-icon btn-bg-warning mb-1 btn-active-color-warning btn-sm me-1'
                                                            onClick={() => router.push(`/dueFees/details/${system.id}`)}
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




                                                </td>

                                            </tr>

                                        ))
                                }

                            </tbody>
                            {/* end::Table body */}
                        </table>

                        {/* end::Table */}
                    </div>
                    {/* end::Table container */}
                </div>
                {/* begin::Body */}
            </div>
            {/* ---------------------------------------------------------------- */}
            {/* ---------------------------------------------------------------- */}


        </div >
    )

}

export default AllDueFees



// export async function getServerSideProps(context) {





//     const { data } = await GetAllDueFees();

//     console.log('data from All DueFees == ', data);


//     return {
//         props: {
//             data: data
//         }
//     }




// }