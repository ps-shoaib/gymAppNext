
import { GetServerSideProps } from 'next'
import AddEditExpenseTypeComponent from 'src/components/AddEditExpenseTypeComponent'

import { parseCookies } from 'src/parseCookies'

const CreateEmployeeCategory = ({data}) => {


    return (
        <AddEditExpenseTypeComponent data='' />
    )
}

export default CreateEmployeeCategory



export const getServerSideProps : GetServerSideProps = async(context) =>{
   
    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : '/login?callbackUrl=http://localhost:3000/expenses/type/create',
          permanent : false
        }
      }
    }

        return {
            props: {
            }
        }
   
}