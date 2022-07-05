
import { GetServerSideProps } from 'next';
import Image from 'next/image'
import icon1 from '../../../assets/svgs/userCount.svg'
import icon2 from '../../../assets/svgs/creditCard.svg'
import icon3 from '../../../assets/svgs/cash.svg'
import { DueFeeModel } from 'src/models/DueFeesViewModels/DueFeesModel';
import { GetDueFeeById, GetFeeById } from 'src/Services/FeeService';


const FeeDetails = ({ data }) => {

    const FeeDetails: DueFeeModel = data;



    return (
        <div className='m-5'>

            <table className='table align-middle gs-0 gy-4  border border-1'>
                {/* begin::Table head */}
                <thead>
                    <tr className='fs-2   fw-bolder bg-light' >
                        {/* <th className='ps-4 min-w-300px rounded-start'>Agent</th> */}
                        <th className='ps-4' colSpan={2}>DueFee Details</th>


                    </tr>
                </thead>

                <tbody>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Due Fee Date
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {new Date(FeeDetails.receiving_Date).toDateString()}
                        </td>
                    </tr>


                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Membership Start Date
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {new Date(FeeDetails.membership_Date).toDateString()}
                        </td>
                    </tr>


                    {/* ----------------------------------------- */}
                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Membership Fee
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.membershipFee}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                            Membership Paid Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.membership_Fee_Received}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                            Membership Due Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.membershipFee - FeeDetails.membership_Fee_Received}
                        </td>
                    </tr>
                    {/* ----------------------------------------- */}
                    {/* ----------------------------------------- */}

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Training Fee
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.trainerFee}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                            Training Paid Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.trainer_Fee_Received}
                        </td>
                    </tr>
                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                            Training Due Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.trainerFee - FeeDetails.trainer_Fee_Received}
                        </td>
                    </tr>
                    {/* ----------------------------------------- */}


                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                            Admission Due Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.isAdmissionFee_Received ? '0' : '2000'}
                        </td>
                    </tr>





                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                            Total Paid Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.trainer_Fee_Received + FeeDetails.membership_Fee_Received + (FeeDetails.isAdmissionFee_Received ? 2000 : 0)}
                            <span className='text-muted' >
                                {FeeDetails.isAdmissionFee_Received ? '( + ADM Fee)' : ''}
                            </span>
                        </td>
                    </tr>


                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Total  Due Fee
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {FeeDetails.dueFee}
                        </td>
                    </tr>





                </tbody>
            </table>



        </div>
    )
}

export default FeeDetails



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    const { id } = params;
    const { data } = await GetFeeById(parseInt(id.toString()));

    console.log('Data by Id --', data);


    return {
        props: {
            data: data
        }
    }

}