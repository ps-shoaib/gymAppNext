
import { GetServerSideProps } from 'next'
import AddEditPlanComponent from '../../src/components/AddEditPlanComponent'
import {parseCookies} from '../../src/parseCookies'

const CreatePlan = ({data}) => {


    return (
        <AddEditPlanComponent data={''} />
    )
}

export default CreatePlan



export const getServerSideProps : GetServerSideProps = async (context) => {


    let CookieObj =  parseCookies(context.req);

  

    if(Object.keys(CookieObj).length == 0){
      return {
        redirect : {
          destination : '/login?callbackUrl=http://localhost:3000/plan/create',
          permanent : false
        }
      }
    }
  
    
    return {
        props: {
        }
    }

}

// export async function getServerSideProps(context) {
   
//         return {
//             props: {
//             }
//         }
   
// }