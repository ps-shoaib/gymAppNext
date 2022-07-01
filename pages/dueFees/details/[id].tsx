
import { GetServerSideProps } from 'next';
import Image from 'next/image'
import icon1 from '../../../assets/svgs/userCount.svg'
import icon2 from '../../../assets/svgs/creditCard.svg'
import icon3 from '../../../assets/svgs/cash.svg'
import { DueFeeModel } from 'src/models/DueFeesViewModels/DueFeesModel';
import { GetDueFeeById } from 'src/Services/FeeService';


const DueFeeDetails = ({ data }) => {

    const DueFeeDetails: DueFeeModel = data;



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
                            {new Date(DueFeeDetails.receiving_Date).toDateString()}
                        </td>
                    </tr>


                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Membership Start Date
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {new Date(DueFeeDetails.membership_Date).toDateString()}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                          Member Contact Number
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.member_PhoneNumber}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                        Member Email
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.member_Email}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Member Address
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.member_Address}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Training Fee
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.trainerFee}
                        </td>
                    </tr>


                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Membership Fee
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.membershipFee}
                        </td>
                    </tr>


                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                        Paid Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.trainer_Fee_Received + DueFeeDetails.membership_Fee_Received}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                        Membership Paid Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.membershipFee - DueFeeDetails.membership_Fee_Received}
                        </td>
                    </tr>
                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                        Training Paid Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.trainerFee - DueFeeDetails.trainer_Fee_Received}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                        Admission Due Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.isAdmissionFee_Received ? '0' : '2000'}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                          Total  Due Fee
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {DueFeeDetails.dueFee}
                        </td>
                    </tr>





                </tbody>
            </table>



        </div>
    )
}

export default DueFeeDetails



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    const { id } = params;
    const { data } = await GetDueFeeById(parseInt(id.toString()));

    console.log('Data by Id --', data);


    return {
        props: {
            data: data
        }
    }

}