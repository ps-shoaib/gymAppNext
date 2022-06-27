
import { GetServerSideProps, GetStaticProps } from 'next'
import AddEditEmployeeComponent from '../../src/components/AddEditEmployeeComponent'
import { parseCookies } from 'src/parseCookies'

const CreateEmployeeCategory = ({ data }) => {


    return (
        <AddEditEmployeeComponent data='' />
    )
}

export default CreateEmployeeCategory



export const getServerSideProps: GetServerSideProps = async (context) => {


    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : '/login?callbackUrl=http://localhost:3000/employees/create',
          permanent : false
        }
      }
    }

    return {
        props: {
        }
    }

}



