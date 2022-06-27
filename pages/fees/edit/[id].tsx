import { GetServerSideProps } from 'next';
import AddEditFeeComponent from 'src/components/AddEditFeeComponent';
import { GetFeeById } from 'src/Services/FeeService';


const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditFeeComponent data={data}/>
    )
}

export default CreateEmployeeCategory



export const getServerSideProps : GetServerSideProps  = async(context) => {
    const { params } = context;

    const { id } = params;
    const { data } = await GetFeeById(parseInt(id.toString()));

    return {
        props: {
            data: data
        }
    }

}