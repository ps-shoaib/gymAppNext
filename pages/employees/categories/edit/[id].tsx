
import { GetEmployeeCategoryById } from '../../../../src/Services/EmployeeCategoryService';
import AddEditEmpCategoryComponent from '../../../../src/components/AddEditEmpCategoryComponent'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'src/parseCookies';

const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditEmpCategoryComponent data={data}/>
    )
}

export default CreateEmployeeCategory




   export const getServerSideProps : GetServerSideProps = async(context) => {

    const { params } = context;

    const { id }  = params;
    const { data } = await GetEmployeeCategoryById(parseInt(id.toString()));

    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : `/login?callbackUrl=http://localhost:3000/employees/edit/${id.toString()}`,
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