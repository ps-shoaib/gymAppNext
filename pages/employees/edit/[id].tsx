
import { GetServerSideProps } from 'next';
import AddEditEmployeeComponent from '../../../src/components/AddEditEmployeeComponent';
import { GetEmployeeById } from '../../../src/Services/EmployeeService';
import { parseCookies } from 'src/parseCookies';

const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditEmployeeComponent data={data}/>
    )
}

export default CreateEmployeeCategory



export const getServerSideProps : GetServerSideProps  = async(context) => {
    const { params } = context;

    const { id } = params;


    const { data } = await GetEmployeeById(parseInt(id.toString()));


    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : `/login?callbackUrl=https://gym-app.ps-beta.com/employees/edit/${id.toString()}`,
          permanent : false
        }
      }
    }


    return {
        props: {
            data: data
        }
    }

}