
import { GetServerSideProps } from 'next';
import AddEditMemberComponent from 'src/components/AddEditMemberComponent';
import { GetMemberById } from 'src/Services/MemberService';
import { GetEmployeeById } from '../../../src/Services/EmployeeService';


const EditMember = ({ data }) => {


    return (
        <AddEditMemberComponent data={data}/>
    )
}

export default EditMember



export const getServerSideProps : GetServerSideProps  = async(context) => {
    const { params } = context;

    const { id } = params;
    const { data } = await GetMemberById(parseInt(id.toString()));

    return {
        props: {
            data: data
        }
    }

}