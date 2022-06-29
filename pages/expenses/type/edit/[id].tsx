import { GetServerSideProps } from 'next';
import AddEditExpenseTypeComponent from 'src/components/AddEditExpenseTypeComponent';
import { GetExpenseTypeById } from 'src/Services/ExpenseTypeService';
import { parseCookies } from 'src/parseCookies';

const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditExpenseTypeComponent data={data}/>
    )
}

export default CreateEmployeeCategory




   export const getServerSideProps : GetServerSideProps = async(context) => {

    const { params } = context;

    const { id } = params;
    const { data } = await GetExpenseTypeById(parseInt(id.toString()));


    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : `/login?callbackUrl=https://gym-app.ps-beta.com/expenses/type/edit/${id.toString()}`,
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