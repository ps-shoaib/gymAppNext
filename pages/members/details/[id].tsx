
import { GetServerSideProps } from 'next';
import { MemberDetailsModel } from 'src/models/MembersModels/MemberDetailsModel';
import { GetMemberById } from 'src/Services/MemberService';
import Image from 'next/image'
import icon1 from '../../../assets/svgs/userCount.svg'
import icon2 from '../../../assets/svgs/creditCard.svg'
import icon3 from '../../../assets/svgs/cash.svg'


const MemberDetails = ({ data }) => {

    const MemberDetails: MemberDetailsModel = data;



    return (
        <div className='m-5'>
        
            <table className='table align-middle gs-0 gy-4  border border-1'>
                {/* begin::Table head */}
                <thead>
                    <tr className='fs-2   fw-bolder bg-light' >
                        {/* <th className='ps-4 min-w-300px rounded-start'>Agent</th> */}
                        <th className='ps-4' colSpan={2}>Member Details</th>


                    </tr>
                </thead>

                <tbody>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Member Name
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.name}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                            Contact Number
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.phoneNumber}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                        Email
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.email}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Gender
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.gender}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                        plan Type
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.plan_Name}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                            Trainer Required
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.is_Trainer_Required  ?  'Required' : 'Not Required'}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                        Training Fee
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.trainingFee ? MemberDetails.trainingFee : '--'}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                        Trainer Name
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.trainerName ? MemberDetails.trainerName : '--'}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                        Occupation
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.occupation}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-100px text-dark text-hover-primary border border-1'>
                        Emergency Contact Name
                        </td>
                        <td className='ps-4 w-100px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.emergencyContactName}
                        </td>
                    </tr>

                    <tr className={'border border-1'}>
                        <td className='ps-4 w-150px text-dark   text-hover-primary border border-1'>
                        Emergency Contact No
                        </td>
                        <td className='ps-4 w-150px text-dark  text-hover-primary border border-1'>
                            {MemberDetails.emergencyContactPhone}
                        </td>
                    </tr>



                </tbody>
            </table>



        </div>
    )
}

export default MemberDetails



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    const { id } = params;
    const { data } = await GetMemberById(parseInt(id.toString()));

    console.log('Data by Id --', data);


    return {
        props: {
            data: data
        }
    }

}