
import { GetServerSideProps } from 'next';
import { GetExpenseById } from 'src/Services/ExpenseService';
import { parseCookies } from 'src/parseCookies';
import AddEditExpenseComponent from 'src/components/AddEditExpenseComponent';

const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditExpenseComponent data={data}/>
    )
}

export default CreateEmployeeCategory



export const getServerSideProps : GetServerSideProps  = async(context) => {
    const { params } = context;

    const { id } = params;
    const { data } = await GetExpenseById(parseInt(id.toString()));


    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : `/login?callbackUrl=http://localhost:3000/expenses/edit/${id.toString()}`,
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